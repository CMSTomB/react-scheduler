import SearchIcon from '@mui/icons-material/Search';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Button, ButtonGroup, Stack, TextField } from "@mui/material";
import { useLanguage } from "@/context/LocaleProvider";
import { StyledLeftColumnHeader, StyledWrapper } from "./styles";
import { LeftColumnProps } from "./types";
import LeftColumnItem from "./LeftColumnItem/LeftColumnItem";

export default function LeftColumn({
	data,
	rows,
	onLoadNext,
	onLoadPrevious,
	pageNum,
	pagesAmount,
	searchInputValue,
	onSearchInputChange,
	onItemClick
}: LeftColumnProps) {
	const { search } = useLanguage();

	return (
		<StyledWrapper>
			<StyledLeftColumnHeader>
				<Stack spacing={0.5}>
					<TextField
						placeholder={search}
						value={searchInputValue}
						onChange={onSearchInputChange}
						slotProps={{
							input: {
								endAdornment: <SearchIcon />
							}
						}}
					/>
					<ButtonGroup fullWidth>
						<Button onClick={onLoadPrevious} disabled={pageNum === 0} startIcon={<ExpandLessIcon />}></Button>
						<Button disabled>{`${pageNum + 1}/${pagesAmount}`}</Button>
						<Button onClick={onLoadNext} disabled={pageNum === pagesAmount - 1} endIcon={<ExpandMoreIcon />}></Button>
					</ButtonGroup>
				</Stack>
			</StyledLeftColumnHeader>
			{data.map((item, index) => (
				<LeftColumnItem
					id={item.id}
					item={item.label}
					key={item.id}
					rows={rows[index]}
					onItemClick={onItemClick}
				/>
			))}
		</StyledWrapper>
	);
}
