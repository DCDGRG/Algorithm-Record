import React from "react";
import "./sidebar.css";

function Sidebar({ onTitleChange, onSortChange, onTimeChange, onNumChange}) {

    const [sort, setSort] = React.useState("MostViewed");
    const [time, setTime] = React.useState("1");

    function handleChange_sort(value) {

        console.log(value, time);
        if (time === "1") {
            onTitleChange(value + " - Day");
        }else if (time === "7") {
            onTitleChange(value + " - Week");
        }else{
            onTitleChange(value + " - Month");
        }

        setSort(value);
        onSortChange(value);
    }

    function handleChange_time(value) {
        let textValue;

        if (value === "1") {
            textValue = "Day";
        } else if (value === "7") {
            textValue = "Week";
        } else {
            textValue = "Month";
        }

        setTime(value);
        onTitleChange(sort + " - " + textValue);
        onTimeChange(value);
    }

    const [inputValue, setInputValue] = React.useState("6");

    const handleInputChange = (event) => {
        //converts the value to a number
        setInputValue(event.target.value);  
    }

    const handleButtonClick = () => {
        const value = parseInt(inputValue, 10);     //parseint converts string to integer, and 10 is the base
        if (value >= 1 && value <= 15) {
            onNumChange(value);
            console.log(value);
        } else {
            alert("Please enter a value between 1-15");
        }
    };

    return (
        <div className="filter-style">

            <input type="number" className="search-input" onChange={handleInputChange} value={inputValue} placeholder="Enter a value 1-15"  />
            <button className="search-button" onClick={handleButtonClick}>Search</button>

            <h2 className="filter-font">Filter</h2>

            <div className="second-header"> Sort by: </div>
            <form id="filter-form">
                <div className="form-style">
                    <label><input type="radio" name="sort" value="MostViewed" checked={sort === "MostViewed"} onChange={() => handleChange_sort("MostViewed", time)} /> Most Viewed</label>
                    <label><input type="radio" name="sort" value="MostShared" checked={sort === "MostShared"} onChange={() => handleChange_sort("MostShared")} /> Most Shared</label>
                    <label> <input type="radio" name="sort" value="MostEmailed" checked={sort === "MostEmailed"} onChange={() => handleChange_sort("MostEmailed")} /> Most Emailed</label>
                </div>
            </form>

            <div className="second-header"> Time Frame: </div>
            <form id="filter-form-time">
                <div class="form-style">
                    <label><input type="radio" name="time" value="1" checked={time === "1"} onChange={() => handleChange_time("1")} /> Day</label>
                    <label><input type="radio" name="time" value="7" checked={time === "7"} onChange={() => handleChange_time("7")} /> Week</label>
                    <label><input type="radio" name="time" value="30" checked={time === "30"} onChange={() => handleChange_time("30")} /> Month</label>
                </div>
            </form>
        </div>

    );
}

export default Sidebar;
