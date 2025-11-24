import { useTheme } from "styled-components";
import { FC, MouseEventHandler } from "react";
import { Button, ButtonGroup } from "@mui/material";
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { Icon, IconButton } from "@/components";
import { useCalendar } from "@/context/CalendarProvider";
import { useLanguage } from "@/context/LocaleProvider";
import {
	Wrapper,
	Filters,
} from "./styles";
import { TopbarProps } from "./types";

const Topbar: FC<TopbarProps> = ({ width }) => {
	const { topbar } = useLanguage();
	const {
		data,
		config,
		handleGoNext,
		handleGoPrev,
		handleGoToday,
		zoomIn,
		zoomOut,
		isNextZoom,
		isPrevZoom,
		handleFilterData,
		onClearFilterData
	} = useCalendar();
	const { colors } = useTheme();
	const { filterButtonState = -1 } = config;

	const handleClearFilters: MouseEventHandler<HTMLButtonElement> = (event) => {
		event.stopPropagation();
		onClearFilterData?.();
	};

	return (
		<Wrapper width={width}>
			<Filters>
				{filterButtonState >= 0 && (
					<IconButton
						variant={filterButtonState ? "filled" : "outlined"}
						iconName="filter"
						width="16"
						height="16"
						onClick={handleFilterData}>
						{topbar.filters}
						{!!filterButtonState && (
							<span onClick={handleClearFilters}>
								<Icon iconName="close" height="16" width="16" fill={colors.textSecondary} />
							</span>
						)}
					</IconButton>
				)}
			</Filters>
			<ButtonGroup>
				<Button disabled={!data?.length} startIcon={<NavigateBeforeIcon />} onClick={handleGoPrev}>{topbar.prev}</Button>
				<Button onClick={handleGoToday}>{topbar.today}</Button>
				<Button disabled={!data?.length} endIcon={<NavigateNextIcon />} onClick={handleGoNext}>{topbar.next}</Button>
			</ButtonGroup>
			<ButtonGroup>
				<Button disabled={!isPrevZoom} onClick={zoomOut} startIcon={<RemoveIcon />}></Button>
				<Button disabled={!isNextZoom} onClick={zoomIn} endIcon={<AddIcon />}></Button>
			</ButtonGroup>
		</Wrapper>
	);
};
export default Topbar;
