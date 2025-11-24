import { useLayoutEffect, useRef } from "react";
import { Box, Tooltip as MUI_Tooltip, Stack, Typography } from "@mui/material";
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import EventBusyIcon from '@mui/icons-material/EventBusy';
import { dayWidth, weekWidth, zoom2ColumnWidth } from "@/constants";
import { useLanguage } from "@/context/LocaleProvider";
import { TooltipProps } from "./types";

export default function Tooltip({ tooltipData, zoom }: TooltipProps) {
	const { coords, disposition } = tooltipData;

	const { taken, free, over } = useLanguage();

	const tooltipRef = useRef<HTMLDivElement>(null);
	let width = weekWidth;
	switch (zoom) {
		case 0:
			width = weekWidth;
			break;
		case 1:
			width = dayWidth;
			break;
		case 2:
			width = zoom2ColumnWidth;
			break;
	}

	useLayoutEffect(() => {
		// re calculate tooltip width before repaint
		if (!tooltipRef.current) return;

		const { width: tooltipWidth } = tooltipRef.current.getBoundingClientRect();

		let xOffset;
		switch (zoom) {
			case 2:
				xOffset = tooltipWidth / 2 + width;
				break;
			default:
				xOffset = tooltipWidth / 2 + width / 2;
				break;
		}
		tooltipRef.current.style.left = `${coords.x - xOffset}px`;
		tooltipRef.current.style.top = `${coords.y + 8}px`;

		// disposition.overtime affects tooltip's width, thus it's needed to recalculate it's coords whenever overtime changes
	}, [coords.x, width, disposition.overtime, coords.y, zoom]);

	return <MUI_Tooltip
		placement="top"
		open={true}
		arrow
		slotProps={{
			popper: {
				sx: {
					transition: 'all 0.25s',
					transitionTimingFunction: 'ease-out',
					pointerEvents: 'none'
				},
				modifiers: [
					{
						name: 'offset',
						options: {
							offset: [0, -72]
						}
					}
				]
			}
		}}
		title={
			<Stack>
				<Stack direction={'row'} spacing={1}>
					<Typography variant="caption" color="error.light"><EventBusyIcon fontSize="small" /></Typography>
					<Typography variant="caption">{`${taken}: ${disposition.taken.hours}h ${disposition.taken.minutes}m`}</Typography>
					{...(disposition.overtime.hours > 0 || disposition.overtime.minutes > 0) ? [
						<Typography key={1} variant="caption">{'-'}</Typography>,
						<Typography key={2} variant="caption" color={'error.light'}>{`${disposition.overtime.hours}h ${disposition.overtime.minutes}m ${over}`}</Typography>
					] : []}
				</Stack>
				<Stack direction={'row'} spacing={1}>
					<Typography variant="caption" color="success.light"><EventAvailableIcon fontSize="small" /></Typography>
					<Typography variant="caption">{`${free}: ${disposition.free.hours}h ${disposition.free.minutes}m`}</Typography>
				</Stack>
			</Stack>
		}
	>
		<Box ref={tooltipRef} position={'absolute'} />
	</MUI_Tooltip>;
}

