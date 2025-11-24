import { useTheme } from "styled-components";
import { useCalendar } from "@/context/CalendarProvider";
import { getDatesRange } from "@/utils/getDatesRange";
import { getTileProperties } from "@/utils/getTileProperties";
import { getTileTextColor } from "@/utils/getTileTextColor";
import {
	StyledDescription,
	StyledStickyWrapper,
	StyledText,
	StyledTextWrapper,
	StyledTileWrapper,
} from "./styles";
import { TileProps } from "./types";

export default function Tile({ row, data, zoom, onTileClick }: TileProps) {
	const { date } = useCalendar();
	const datesRange = getDatesRange(date, zoom);
	const { y, x, width } = getTileProperties(
		row,
		datesRange.startDate,
		datesRange.endDate,
		data.startDate,
		data.endDate,
		zoom
	);

	const { colors } = useTheme();

	return (
		<StyledTileWrapper
			style={{
				left: `${x}px`,
				top: `${y}px`,
				backgroundColor: `${data.bgColor ?? colors.defaultTile}`,
				width: `${width}px`,
				color: getTileTextColor(data.bgColor ?? "")
			}}
			onClick={() => onTileClick?.(data)}>
			<StyledTextWrapper>
				<StyledStickyWrapper>
					<StyledText fontWeight={'600'}>{data.title}</StyledText>
					<StyledText fontWeight={'400'}>{data.subtitle}</StyledText>
					<StyledDescription>{data.description}</StyledDescription>
				</StyledStickyWrapper>
			</StyledTextWrapper>
		</StyledTileWrapper>
	);
}
