"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var _react=require("react"),_propTypes=_interopRequireDefault(require("prop-types")),_mobxReact=require("mobx-react"),_reactIntl=require("react-intl"),_Form=_interopRequireDefault(require("../../lib/Form")),_Input=_interopRequireDefault(require("../ui/Input")),_Select=_interopRequireDefault(require("../ui/Select")),_Button=_interopRequireDefault(require("../ui/Button")),_Link=_interopRequireDefault(require("../ui/Link")),_Infobox=_interopRequireDefault(require("../ui/Infobox")),_validationHelpers=require("../../helpers/validation-helpers"),_config=require("../../config"),_globalMessages=_interopRequireDefault(require("../../i18n/globalMessages")),_jsxRuntime=require("react/jsx-runtime");function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}const messages=(0,_reactIntl.defineMessages)({headline:{id:"changeserver.headline",defaultMessage:[{type:0,value:"Change server"}]},label:{id:"changeserver.label",defaultMessage:[{type:0,value:"Server"}]},warning:{id:"changeserver.warning",defaultMessage:[{type:0,value:"Extra settings offered by Ferdi will not be saved"}]},customServerLabel:{id:"changeserver.customServerLabel",defaultMessage:[{type:0,value:"Custom server"}]},urlError:{id:"changeserver.urlError",defaultMessage:[{type:0,value:"Enter a valid URL"}]}});class ChangeServer extends _react.Component{constructor(...e){super(...e),this.ferdiServer=_config.LIVE_FERDI_API,this.franzServer=_config.LIVE_FRANZ_API,this.defaultServers=[this.franzServer,this.ferdiServer],this.form=new _Form.default({fields:{server:{label:this.props.intl.formatMessage(messages.label),value:this.props.server,options:[{value:this.ferdiServer,label:"Ferdi"},{value:this.franzServer,label:"Franz"},{value:this.defaultServers.includes(this.props.server)?"":this.props.server,label:"Custom"}]},customServer:{label:this.props.intl.formatMessage(messages.customServerLabel),value:"",validators:[_validationHelpers.url,_validationHelpers.required]}}},this.props.intl)}componentDidMount(){this.defaultServers.includes(this.props.server)?this.form.$("server").value=this.props.server:(this.form.$("server").value="",this.form.$("customServer").value=this.props.server)}submit(e){e.preventDefault(),this.form.submit({onSuccess:e=>{this.defaultServers.includes(e.values().server)||e.$("server").onChange(e.values().customServer),this.props.onSubmit(e.values())},onError:e=>{this.defaultServers.includes(e.values().server)&&this.props.onSubmit(e.values())}})}render(){const{form:e}=this,{intl:r}=this.props;return(0,_jsxRuntime.jsx)("div",{className:"auth__container",children:(0,_jsxRuntime.jsxs)("form",{className:"franz-form auth__form",onSubmit:e=>this.submit(e),children:[(0,_jsxRuntime.jsx)(_Link.default,{to:"/auth/welcome",children:(0,_jsxRuntime.jsx)("img",{src:"./assets/images/logo.svg",className:"auth__logo",alt:""})}),(0,_jsxRuntime.jsx)("h1",{children:r.formatMessage(messages.headline)}),e.$("server").value===this.franzServer&&(0,_jsxRuntime.jsx)(_Infobox.default,{type:"warning",children:r.formatMessage(messages.warning)}),(0,_jsxRuntime.jsx)(_Select.default,{field:e.$("server")}),!this.defaultServers.includes(e.$("server").value)&&(0,_jsxRuntime.jsx)(_Input.default,{placeholder:"Custom Server",onChange:e=>this.submit(e),field:e.$("customServer")}),(0,_jsxRuntime.jsx)(_Button.default,{type:"submit",className:"auth__button",label:r.formatMessage(_globalMessages.default.submit)})]})})}}ChangeServer.propTypes={onSubmit:_propTypes.default.func.isRequired,server:_propTypes.default.string.isRequired};var _default=(0,_reactIntl.injectIntl)((0,_mobxReact.observer)(ChangeServer));exports.default=_default;