import { FC, useState } from "react";
import SearchIcon from '@mui/icons-material/Search';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Button, ButtonGroup, TextField } from "@mui/material";
import { useLanguage } from "@/context/LocaleProvider";
import { StyledLeftColumnHeader, StyledWrapper } from "./styles";
import { LeftColumnProps } from "./types";
import LeftColumnItem from "./LeftColumnItem/LeftColumnItem";

const LeftColumn: FC<LeftColumnProps> = ({
	data,
	rows,
	onLoadNext,
	onLoadPrevious,
	pageNum,
	pagesAmount,
	searchInputValue,
	onSearchInputChange,
	onItemClick
}) => {
	const [isInputFocused, setIsInputFocused] = useState(false);
	const { search, loadNext, loadPrevious } = useLanguage();

	const toggleFocus = () => setIsInputFocused((prev) => !prev);

	return (
		<StyledWrapper>
			<StyledLeftColumnHeader>
				<TextField
					focused={isInputFocused}
					placeholder={search}
					value={searchInputValue}
					onChange={onSearchInputChange}
					onFocus={toggleFocus}
					onBlur={toggleFocus}
					slotProps={{
						input: {
							endAdornment: <SearchIcon />
						}
					}}
				/>
				<ButtonGroup size="small" orientation="vertical">
					<Button
						onClick={onLoadPrevious}
						disabled={pageNum === 0}
						startIcon={<ExpandLessIcon />}
					>
						{`${loadPrevious} ${Math.max(pageNum, 1)}/${pagesAmount}`}
					</Button>
					<Button
						onClick={onLoadNext}
						disabled={pageNum === pagesAmount - 1}
						startIcon={<ExpandMoreIcon />}
					>
						{`${loadNext} ${Math.min(pageNum + 2, pagesAmount)}/${pagesAmount}`}
					</Button>
				</ButtonGroup>
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
};

export default LeftColumn;
