import {
    CREATE_SNIPPET_PAGE_LINK,
    HOME_PAGE_LINK,
    MY_ACCOUNT_PAGE_LINK,
    MY_SNIPPETS_PAGE_LINK, QUESTIONS_PAGE_LINK, USERS_PAGE_LINK
} from "@/shared/constants/index";
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import CreateRoundedIcon from '@mui/icons-material/CreateRounded';
import PeopleAltRoundedIcon from '@mui/icons-material/PeopleAltRounded';
import QuestionMarkRoundedIcon from '@mui/icons-material/QuestionMarkRounded';
import LaptopMacRoundedIcon from '@mui/icons-material/LaptopMacRounded';
import AccountBoxRoundedIcon from '@mui/icons-material/AccountBoxRounded';

export const NAV_ITEMS = [
    {path: HOME_PAGE_LINK, label: "Home", icon:<HomeRoundedIcon/>},
    {path: MY_ACCOUNT_PAGE_LINK, label: "My account", authOnly: true, icon:<AccountBoxRoundedIcon/>},
    {path: CREATE_SNIPPET_PAGE_LINK, label: "Post Snippet", authOnly: true, icon:<CreateRoundedIcon/>},
    {path: MY_SNIPPETS_PAGE_LINK, label: "My Snippets", authOnly: true, icon:<LaptopMacRoundedIcon/>},
    {path: QUESTIONS_PAGE_LINK, label: "Questions", icon : <QuestionMarkRoundedIcon/>},
    {path: USERS_PAGE_LINK, label: "Users", icon:<PeopleAltRoundedIcon/>},
];