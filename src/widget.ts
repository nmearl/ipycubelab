// Copyright (c) Nicholas Earl
// Distributed under the terms of the Modified BSD License.

import {
  DOMWidgetModel, DOMWidgetView, ISerializers, WidgetModel
} from '@jupyter-widgets/base';

import {
  MODULE_NAME, MODULE_VERSION
} from './version';

// import {
//   Message
// } from '@phosphor/messaging';

import Vue from "vue";
import App from "./App.vue";
// import HelloComponent from "./components/Hello.vue";
// import HelloDecoratorComponent from "./components/HelloDecorator.vue";

export
class ExampleModel extends DOMWidgetModel {
  defaults() {
    return {...super.defaults(),
      _model_name: ExampleModel.model_name,
      _model_module: ExampleModel.model_module,
      _model_module_version: ExampleModel.model_module_version,
      _view_name: ExampleModel.view_name,
      _view_module: ExampleModel.view_module,
      _view_module_version: ExampleModel.view_module_version,
      value : 'Hello World'
    };
  }

  static serializers: ISerializers = {
      ...DOMWidgetModel.serializers,
      // Add any extra serializers here
    }

  static model_name = 'ExampleModel';
  static model_module = MODULE_NAME;
  static model_module_version = MODULE_VERSION;
  static view_name = 'ExampleView';   // Set to null if no view
  static view_module = MODULE_NAME;   // Set to null if no view
  static view_module_version = MODULE_VERSION;
}


export
class ExampleView extends DOMWidgetView {
  // protected vapp: HTMLDivElement;
  public email_input: HTMLInputElement;
  public vue: Vue;

  constructor(options?: Backbone.ViewOptions<WidgetModel> & {
    options?: any;
  }) {
    super(options);
    console.log("CONSTRUCTED");
    // this.vapp = document.createElement('div');
    // this.vapp.setAttribute("id", "app");

    this.email_input = document.createElement('input');
    this.email_input.type = 'email';
    this.email_input.value = this.model.get('value');

    this.el.appendChild(this.email_input);
    // this.el.appendChild(this.vapp);


    this.vue = new Vue({
      render: (h) => h(App),
    }).$mount('#app');

    console.log("Div appended.")
  }

  render() {

    this.value_changed();
    this.model.on('change:value', this.value_changed, this);

    this.email_input.onchange = this.input_changed.bind(this);
  }

  // processPhosphorMessage(msg: Message) {
  //   super.processPhosphorMessage(msg);

  //   switch (msg.type) {
  //     case 'after-attach':
  //   }
  // }

  value_changed() {
    this.email_input.value = this.model.get('value');
  }

  input_changed() {
    this.model.set('value', this.email_input.value);
    this.model.save_changes();
  }
}
