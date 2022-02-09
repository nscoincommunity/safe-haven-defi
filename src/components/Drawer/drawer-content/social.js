import { SvgIcon, Link } from "@mui/material";
import { Flex } from "@pancakeswap/uikit";
import { ReactComponent as GitHub } from "../../../assets/icons/github.svg";
import { ReactComponent as Twitter } from "../../../assets/icons/twitter.svg";
import { ReactComponent as Telegram } from "../../../assets/icons/telegram.svg";
import { ReactComponent as Discord } from "../../../assets/icons/discord.svg";

export default function Social({mobileOpen}) {
    return (
        <Flex className="social-row" flexDirection={mobileOpen ? "row" : "column"} alignItems="center">
            <Link href="https://github.com/" target="_blank">
                <SvgIcon color="primary" component={GitHub} />
            </Link>

            <Link href="https://twitter.com/" target="_blank">
                <SvgIcon color="primary" component={Twitter} />
            </Link>

            <Link href="https://t.me/" target="_blank">
                <SvgIcon viewBox="0 0 32 32" color="primary" component={Telegram} />
            </Link>

            <Link href="https://discord.gg/" target="_blank">
                <SvgIcon color="primary" component={Discord} />
            </Link>
        </Flex>
    );
}
