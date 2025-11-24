import { styled } from "@mui/system";
import { Box, Typography } from "@mui/material";
import { marginPaddingReset as mui_marginPaddingReset, truncate as mui_truncate } from "@/mui_styles";
import { leftColumnWidth, tileHeight } from "@/constants";

export const StyledTileWrapper = styled('button')(({ theme }) => ({
	...mui_marginPaddingReset,
	height: `${tileHeight}px`,
	position: 'absolute',
	outline: 'none',
	border: 'none',
	borderRadius: '4px',
	textAlign: 'left',
	color: theme.palette.primary.contrastText,
	width: '100%',
	cursor: 'pointer',
}));

export const StyledTextWrapper = styled(Box)({
	margin: '10px 16px',
	position: 'relative',
	display: 'flex',
	fontSize: '10px',
	letterSpacing: '0.5px',
	lineHeight: '12px'
});

export const StyledDescription = styled(Typography)({
	...mui_marginPaddingReset,
	...mui_truncate,
	letterSpacing: 'inherit',
	fontSize: 'inherit',
});


export const StyledText = styled(Typography)({
	...mui_marginPaddingReset,
	...mui_truncate,
	letterSpacing: 'inherit',
	fontSize: 'inherit',
	display: 'inline',
	['&:first-of-type']: {
		['&::after']: {
			content: '"|"',
			margin: '0 3px'
		}
	}
});

export const StyledStickyWrapper = styled(Box)({
	position: 'sticky',
	left: `${leftColumnWidth + 16}px`,
	overflow: 'hidden',
});
