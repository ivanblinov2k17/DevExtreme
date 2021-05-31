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
  <div {... model.someAttrs} className="divClass">asd</div>
);

@Component({ view: viewFunction, jQuery: { register: true } })
export class BugWidget extends JSXComponent(WidgetProps) {
  someAttrs = {
    className: 'getterClass',
  };
}
