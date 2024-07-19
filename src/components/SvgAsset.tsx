import { SvgName, Svgs } from 'assets/index';
import { SvgProps } from 'react-native-svg';

type SvgAssetProps = SvgProps & {
  name: SvgName;
};

export const SvgAsset: React.FC<SvgAssetProps> = ({ name, ...svgProps }) => {
  const Asset = Svgs[name];
  return <Asset {...svgProps} />;
};
