import ReactIcon, { IconProps } from "./ReactIcon";
import './IconWithText.scss';

export interface IconWithTextProps {
  IconAttr: IconProps;
  Text: string;
}

export const IconWithText = (props: IconWithTextProps) => {
  return <div className='leftIconWithText'>
    <ReactIcon key={props.Text} icon={props.IconAttr.icon} module={props.IconAttr.module} size={props.IconAttr.size} color={props.IconAttr.color} />
    <div className='leftText'>{props.Text}</div>
  </div>
};
