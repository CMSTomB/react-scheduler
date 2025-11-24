import { MouseEventHandler, useState } from "react";
import { Button, ButtonGroup, Dialog } from "@mui/material";
import { StaticDateTimePicker } from "@mui/x-date-pickers";
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import CloseIcon from '@mui/icons-material/Close';
import dayjs from "dayjs";
import { useCalendar } from "@/context/CalendarProvider";
import { useLanguage } from "@/context/LocaleProvider";
import {
	Wrapper,
	Filters,
} from "./styles";
import { TopbarProps } from "./types";

export default function Topbar({ width }: TopbarProps) {
	const [dialogOpen, setDialogOpen] = useState(false);

	const { topbar } = useLanguage();
	const {
		data,
		config,
		handleGoNext,
		handleGoPrev,
		handleGoToday,
		handleGoCustom,
		zoomIn,
		zoomOut,
		isNextZoom,
		isPrevZoom,
		handleFilterData,
		onClearFilterData
	} = useCalendar();
	const { filterButtonState = -1 } = config;

	const handleClearFilters: MouseEventHandler<HTMLButtonElement> = (event) => {
		event.stopPropagation();
		onClearFilterData?.();
	};

	return (
		<>
			<Wrapper width={width}>
				<Filters>
					{filterButtonState >= 0 && (
						<ButtonGroup>
							<Button
								variant={filterButtonState ? 'outlined' : 'contained'}
								onClick={handleFilterData}>
								{topbar.filters}
							</Button>
							{!!filterButtonState && <Button
								onClick={handleClearFilters}
								endIcon={<CloseIcon />}
							/>}
						</ButtonGroup>
					)}
				</Filters>
				<ButtonGroup>
					<Button disabled={!data?.length} startIcon={<NavigateBeforeIcon />} onClick={handleGoPrev}>{topbar.prev}</Button>
					<Button onClick={handleGoToday}>{topbar.today}</Button>
					<Button onClick={() => setDialogOpen(true)}>{'Custom'}</Button>
					<Button disabled={!data?.length} endIcon={<NavigateNextIcon />} onClick={handleGoNext}>{topbar.next}</Button>
				</ButtonGroup>
				<ButtonGroup>
					<Button disabled={!isPrevZoom} onClick={zoomOut} startIcon={<RemoveIcon />}></Button>
					<Button disabled={!isNextZoom} onClick={zoomIn} endIcon={<AddIcon />}></Button>
				</ButtonGroup>
			</Wrapper>
			<Dialog
				open={dialogOpen}
				onClose={() => setDialogOpen(false)}
			>
				<StaticDateTimePicker
					defaultValue={dayjs()}
					onAccept={(value) => {
						handleGoCustom(value ?? dayjs());
						setDialogOpen(false);
					}}
					slotProps={{
						actionBar: {
							// Due to "onClose" being soon deprecated
							actions: ['accept']
						}
					}}
					ampm={false}
				/>
			</Dialog>
		</>
	);
}
