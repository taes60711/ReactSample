import ReactIcon, { IconProps } from "./ReactIcon";
import './IconWithText.scss';

export interface IconWithTextProps {
  iconAttr: IconProps;
  text: string;
}

export const IconWithText = (props: IconWithTextProps) => {
  return <div className='leftIconWithText'>
    <ReactIcon key={props.text} icon={props.iconAttr.icon} module={props.iconAttr.module} size={props.iconAttr.size} color={props.iconAttr.color} />
    <div className='leftText'>{props.text}</div>
  </div>
};
