'use strict';

var form_vue_rollupPluginVue_script = require('./form.vue_rollup-plugin-vue_script.js');
var normalizeComponent = require('../../../../node_modules/vue-runtime-helpers/dist/normalize-component.js');

/* script */
const __vue_script__ = form_vue_rollupPluginVue_script;

/* template */
var __vue_render__ = function () {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "form",
    {
      staticClass: "flex flex-col gap-4",
      attrs: { method: "get", action: "form" },
      on: {
        submit: function ($event) {
          $event.preventDefault();
          return _vm.updateWords.apply(null, arguments)
        },
      },
    },
    [
      _vm._ssrNode(
        "<div>" +
          _vm._ssrEscape(_vm._s(_vm.ignore_chars)) +
          '</div> <dl><dt><label for="ignore_chars">Ignore letters</label></dt> <dd><input type="text" name="ignore_chars" id="ignore_chars"' +
          _vm._ssrAttr("value", _vm.ignore_chars) +
          '></dd></dl> <dl><dt class="w-1/2"><label for="required_chars">Required letters</label></dt> <dd class="flex gap-4">' +
          _vm._ssrList(_vm.required_chars, function (char, idx) {
            return (
              '<span><input type="text" maxlength="1"' +
              _vm._ssrAttr("value", char.char) +
              ' class="text-center"></span>'
            )
          }) +
          '</dd></dl> <dl><dt class="w-1/3"><label for="fixed_chars">Correct letters</label></dt> <dd class="flex gap-4"><input type="text" maxlength="1" x-model="char.char" class="text-center"></dd></dl> <div class="flex justify-end"><button type="submit" class="bg-green-500 p-2 px-4 text-black">Get Suggestions</button></div>'
      ),
    ]
  )
};
var __vue_staticRenderFns__ = [];
__vue_render__._withStripped = true;

  /* style */
  const __vue_inject_styles__ = undefined;
  /* scoped */
  const __vue_scope_id__ = undefined;
  /* module identifier */
  const __vue_module_identifier__ = "data-v-80edf774";
  /* functional template */
  const __vue_is_functional_template__ = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__ = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
    __vue_inject_styles__,
    __vue_script__,
    __vue_scope_id__,
    __vue_is_functional_template__,
    __vue_module_identifier__,
    false,
    undefined,
    undefined,
    undefined
  );

module.exports = __vue_component__;
