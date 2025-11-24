import { FC } from "react";
import { Avatar, Stack, Typography } from "@mui/material";
import {
	StyledImageWrapper,
	StyledInnerWrapper,
	StyledWrapper
} from "./styles";
import { LeftColumnItemProps } from "./types";

const LeftColumnItem: FC<LeftColumnItemProps> = ({ id, item, rows, onItemClick }) => {
	return (
		<StyledWrapper
			title={item.title + " | " + item.subtitle}
			clickable={typeof onItemClick === "function"}
			rows={rows}
			onClick={() => onItemClick?.({ id, label: item })}>
			<StyledInnerWrapper>
				<StyledImageWrapper>
					{item.icon ? (
						<Avatar
							src={item.icon}
							alt="Icon"
							style={{
								objectFit: 'cover',
								height: '100%',
								width: '100%'
							}}
						/>
					) : (
						<Avatar />
					)}
				</StyledImageWrapper>
				<Stack>
					<Typography fontSize={'12px'}>{item.title}</Typography>
					<Typography color={'textDisabled'} fontSize={'10px'}>{item.subtitle}</Typography>
				</Stack>
			</StyledInnerWrapper>
		</StyledWrapper>
	);
};

export default LeftColumnItem;
