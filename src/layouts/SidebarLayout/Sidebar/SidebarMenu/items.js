import AccountCircleTwoToneIcon from '@mui/icons-material/AccountCircleTwoTone';
import EmojiEventsTwoToneIcon from '@mui/icons-material/EmojiEventsTwoTone';
import SportsTennisIcon from '@mui/icons-material/SportsTennisTwoTone';
import PeopleTwoToneIcon from '@mui/icons-material/PeopleTwoTone';
import HomeTwoTone from '@mui/icons-material/HomeTwoTone';

const menuItems = [
  {
    heading: '',
    items: [
      {
        name: 'Dashboard',
        link: '/home',
        icon: HomeTwoTone
      }
    ]
  },
  {
    heading: 'Dashboards',
    items: [
      {
        name: 'Players',
        link: '/dashboards/players',
        icon: PeopleTwoToneIcon
      },
      {
        name: 'Games',
        icon: SportsTennisIcon,
        link: '/dashboards/games'
      },
      {
        name: 'Ranking',
        icon: EmojiEventsTwoToneIcon,
        link: '/dashboards/ranking'
      },
    ]
  },
  {
    heading: 'Admin',
    items: [
      {
        name: 'New Game',
        icon: SportsTennisIcon,
        link: '/admin/newgame'
      },
      {
        name: 'New Player',
        icon: AccountCircleTwoToneIcon,
        link: '/admin/newplayer'
      },
    ]
  },
];

export default menuItems;
