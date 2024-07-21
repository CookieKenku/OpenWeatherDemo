import { SvgProps } from 'react-native-svg';
import { SvgName, Svgs } from 'assets/index';

type SvgAssetProps = SvgProps & {
  name: SvgName;
};

export const SvgAsset: React.FC<SvgAssetProps> = ({ name, ...svgProps }) => {
  const Asset = Svgs[name];
  return <Asset {...svgProps} />;
};
