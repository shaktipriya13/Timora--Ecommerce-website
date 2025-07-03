import React from "react";

const CategoryForm = ({ handleSubmit, value, setValue }) => {
    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Enter new category"
                        value={value}
                        // we are getting value as a prop
                        // so we can use it in the input field
                        onChange={(e) => setValue(e.target.value)}
                    />
                </div>

                <button type="submit" className="btn btn-primary">
                    Submit
                </button>
            </form>
        </>
    );
};

export default CategoryForm;