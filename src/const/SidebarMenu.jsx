import EdaIcon from '../assets/images/sidebar/Eda.svg';
import EdaIconDark from '../assets/images/sidebar/EdaDark.svg';
// import Line from '../assets/images/sidebar/Line.svg';
// import LineDark from '../assets/images/sidebar/LineDark.svg';
import SamplingIcon from '../assets/images/sidebar/Sampling.svg';
import SamplingIconDark from '../assets/images/sidebar/SamplingDark.svg';
import ETAIcon from '../assets/images/sidebar/Eta.svg';
import ETAIconDark from '../assets/images/sidebar/EtaDark.svg';
import OutlierIcon from '../assets/images/sidebar/Outlier.svg';
import OutlierIconDark from '../assets/images/sidebar/OutlierDark.svg';
import TDAIcon from '../assets/images/sidebar/TuningData.svg';
import TDAIconDark from '../assets/images/sidebar/TuningDataDark.svg';
import ImpactAnalysisIcon from '../assets/images/sidebar/Impact.svg';
import ImpactAnalysisIconDark from '../assets/images/sidebar/ImpactDark.svg';

const SIDEBAR_MENUS = [
  {
    name: 'Data Upload',
    icon: OutlierIcon,
    iconActive: OutlierIconDark,
    route: 'dataupload',
  },
  {
    name: 'univariate',
    icon: EdaIcon,
    iconActive: EdaIconDark,
    route: '/univariate',
  },
  {
    name: 'Outlier',
    icon: TDAIcon,
    iconActive: TDAIconDark,
    route: '/outlier',
  },
  {
    name: 'Missing Value',
    icon: ETAIcon,
    iconActive: ETAIconDark,
    route: '/missingValue',
  },
  {
    name: 'Bivariate',
    icon: SamplingIcon,
    iconActive: SamplingIconDark,
    route: '/bivariate',
  },
  {
    name: 'Report',
    icon: ImpactAnalysisIcon,
    iconActive: ImpactAnalysisIconDark,
    route: '/report',
  },
];

export { SIDEBAR_MENUS };
