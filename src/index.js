import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

/* Function create HTML input element
 *   inputType - what type of input
 *   label - optional label which show under control
 */
function InputControl (props) {
    return (
        <div className="control">
            <input type={props.inputType} defaultValue={props.value} />
            <label>{props.label}</label>
        </div>
    );
}

/* Object create dropdown control using HTML5 datalist tag
 * options - options which we can select from combobox
 * value - optional default value
 * label - optional label which show under control
 * id - id which bind input with datalist
 */
class Combobox extends React.Component {
    constructor(props) {
        super(props);
        this.options = props.options;
        this.id = props.id;
        this.value = props.value;
        this.label = props.label;
    }

    //funnction create single option for combobox
    renderOption (props) {
        return <option key={props} value={props} />
    }

    //function create all options for combobox
    renderOptions() {
        return this.options.map(this.renderOption);
    }

    //function render control
    render() {
        return (
            <div className="control">
                <input list={this.id} defaultValue={this.value} />
                <datalist id={this.id}>
                    {this.renderOptions()}
                </datalist>
                <label>{this.label}</label>
            </div>
        );
    }
}

/* Object create control to show time. Control consists of three
 * comboboxs. First combobox represent hours. Second represent
 * minutes. Last represent time of day (AM/PM)
 *  id - control ID
 */
class Time extends React.Component {
    constructor(props) {
        super(props);
        this.id = props.id;
    }

    /* function create combobox
     * key - unique "key" which is needed because each child in
     * an array or iterator should have a unique "key" prop.
     */
    renderCombobox (props) {
        return <Combobox
            key={Symbol().iterator}
            id={props.id}
            options={props.options}
            value={props.value}
            label={props.label}
        />
    }

    //render control
    render() {
        return (
            <div id={this.id} className="control HorizontalElements">
                {this.renderCombobox({
                    id: "arrivalHour",
                    value: "02",
                    label: "Hours",
                    options: [
                        "01",
                        "02",
                        "03",
                        "04",
                        "05",
                        "06",
                        "07",
                        "08",
                        "09",
                        "10",
                        "11",
                        "12"
                    ]
                })}
                {this.renderCombobox({
                    id: "arrivalMinutes",
                    value: "40",
                    label: "Minutes",
                    options: [
                    "00",
                    "10",
                    "20",
                    "30",
                    "40",
                    "50"
                    ]
                })}
                {this.renderCombobox({
                    id: "arrivalTimeOfDay",
                    value: "PM",
                    label: "",
                    options: [
                        "AM",
                        "PM"
                    ]
                })}
            </div>
        );
    }
}

/* Object create Section in main component. Section groups controls which gathering
 * the same type of information. (eg. First Name and Last Name),
 *  name - name of section
 *  controls - list controls which must be generate for this section
 *  display - decided if controls will be displayed horizontaly and verticaly.
 *            Default value for this parameter is horizontaly.
 *  even - parameter say if section is odd or even
 */
class Section extends React.Component {
    constructor(props) {
        super(props);
        this.name = props.name;
        this.controls = props.controls;
        this.display = props.display || "HorizontalElements";
        this.background = props.even ? "evenSection" : "oddSection"
    }

    //function create one control
    renderControl(props) {
        if(props.type === "input") {
            return <InputControl
                key={Symbol().iterator}
                value={props.value}
                type={props.inputType}
                label={props.label}
            />;
        }
        else if(props.type === "dropdown") {
          return <Combobox
              key={Symbol().iterator}
              id={props.id}
              value={props.value}
              options={props.options}
              label={props.label}
          />
        }
        else if(props.type === "time") {
            return <Time
                key={Symbol().iterator}
                id={props.id}
            />
        }
        else {
            console.log("unsupported type: " + props.type);
        }
    }

    // function create all controls for section
    renderInputControls() {
        return this.controls.map(this.renderControl);
    }

    // function render section
    render() {
        return (
            <div  className={"HorizontalElements " + this.background}>
                <span className="nameSection">
                    <p>{this.name}:</p>
                </span>
                <div className={"controlSection " + this.display}>
                    {this.renderInputControls()}
                </div>
            </div>
        )
    }
}

/* Object create control represent main component
 */
class ConForm extends React.Component {
    // function create one section
    renderSection(props) {
        return <Section
            name={props.name}
            controls={props.controls}
            display={props.display}
            even ={props.even}
        />;
    }

    // function render main component
    render() {
        return (
            <div id="sections">
                {this.renderSection({
                    name: "Full Name",
                    even: false,
                    controls: [
                        {type: "input", inputType: "text", value: "Marcin", label: "First Name"},
                        {type: "input", inputType: "text", value: "Ganczarek", label: "Last Name"}
                    ]
                })}
                {this.renderSection({
                    name: "E-mail",
                    even: true,
                    controls: [
                        {type: "input", inputType: "email", value: "marcin.ganczarek@gmail.com", label: ""}
                    ]
                })}
                {this.renderSection({
                    name: "Phone Number",
                    even: false,
                    controls: [
                        {type: "input", inputType: "text", value: "074 12345678", label: "Phone Number"},
                    ]
                })}
                {this.renderSection({
                    name: "Room type",
                    even: true,
                    controls: [
                        {type: "dropdown", label: "", id: "roomTypes", value: "Standard Room", options: [
                                "Standard Room",
                                "Family Room",
                                "Private Room",
                                "Mix Dorm Room",
                                "Female Dorm Room",
                                "Male Dorm Room"
                            ]},
                    ]
                })}
                {this.renderSection({
                    name: "Arrival Date and Time",
                    even: false,
                    display: "VerticalElements",
                    controls: [
                        {type: "input", inputType: "date", value: new Date().toDateString(), label: ""},
                        {type: "time", id: "arrivalTime"},
                    ]
                })}
            </div>
        );
    }
}

//render and add to DOM main component
ReactDOM.render(
    <ConForm />, document.getElementById('root')
);

