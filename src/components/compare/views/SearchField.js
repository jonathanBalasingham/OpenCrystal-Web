import React, { useEffect, useState } from "react";
import { useSigma } from "react-sigma-v2";
import { BsSearch } from "react-icons/bs";

/**
 * This component is basically a fork from React-sigma-v2's SearchControl
 * component, to get some minor adjustments:
 * 1. We need to hide hidden nodes from results
 * 2. We need custom markup
 */
const SearchField = ({ filters }) => {
  const sigma = useSigma();
  const [search, setSearch] = useState("");
  const [values, setValues] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    const newValues = [];
    const lcSearch = search.toLowerCase();
    if (!selected && search.length > 1) {
      sigma.getGraph().forEachNode((key, attributes) => {
        if (!attributes.hidden && attributes.label && attributes.label.toLowerCase().indexOf(lcSearch) === 0)
          newValues.push({ id: key, label: attributes.label });
      });
    }
    setValues(newValues);
  }, [search, selected, sigma]);

  useEffect(() => {
    if (!selected) return;
    sigma.getGraph().setNodeAttribute(selected, "highlighted", true);
    const nodeDisplayData = sigma.getNodeDisplayData(selected);

    if (nodeDisplayData)
      sigma.getCamera().animate(
          { ...nodeDisplayData, ratio: 0.05 },
          {
            duration: 600,
          },
      );

    return () => {
      sigma.getGraph().setNodeAttribute(selected, "highlighted", false);
    };
  }, [selected, sigma]);

  const onInputChange = (e) => {
    const searchString = e.target.value;
    const valueItem = values.find((value) => value.label === searchString);
    console.log(values)
    if (valueItem) {
      setSearch(valueItem.label);
      setValues([]);
      setSelected(valueItem.id);
    } else {
      setSelected(null);
      setSearch(searchString);
    }
  };

  const onKeyPress = (e) => {
    if (e.key === "Enter" && values.length) {
      setSearch(values[0].label);
      setSelected(values[0].id);
    }
  };

  return (
    <div className="search-wrapper">
      <input
        type="search"
        placeholder="Search in nodes..."
        list="nodes"
        value={search}
        onChange={onInputChange}
        onKeyPress={onKeyPress}
      />
      <BsSearch className="icon" />
      <datalist id="nodes">
        {values.map((value) => (
            <option key={value.id} value={value.label}>
              {value.label}
            </option>
        ))}
      </datalist>
    </div>
  );
};


export default SearchField;
