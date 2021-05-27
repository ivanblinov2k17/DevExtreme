/* eslint-disable react/jsx-props-no-spreading */
import {
  Component,
  ComponentBindings,
  JSXComponent,
  OneWay,
} from '@devextreme-generator/declarations';

@ComponentBindings()
export class WidgetProps {
  @OneWay() testProp?: string;
}

const viewFunction = (model: BugWidget): JSX.Element => (
  <div {...{
    ...model.restAttributes,
    className: 'test-className',
  }}
  >
    {model.props.testProp}
    kek
  </div>
);

@Component({ view: viewFunction, jQuery: { register: true } })
export class BugWidget extends JSXComponent(WidgetProps) {

}
