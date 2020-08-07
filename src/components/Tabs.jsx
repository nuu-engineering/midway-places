import React from 'react';
import classnames from 'classnames';

const Tabs = ({ sections, showing }) => {
  const [selected, setSelected] = React.useState(0);

  return (
    <div data-duration-in="300" data-duration-out="100" className="w-tabs">
      <div className="inner-tab-menu w-tab-menu" role="tablist">
        { sections.map((section, index) => (
            <a
              key={index}
              data-w-tab={`Tab ${index + 1}`}
              className={classnames("tab-link-news mr-3 w-inline-block w-tab-link", { "w--current": index === selected })}
              id={`w-tabs-1-data-w-tab-${index}`}
              href="#"
              role="tab"
              aria-controls={`w-tabs-1-data-w-pane-${index}`}
              aria-selected={index === selected}
              onClick={(ev) => { if(ev) ev.preventDefault(); setSelected(index); }}
            >
              <div>{section.name}</div>
              { index === selected ? <div className="hr-selected-full-1px"></div> : null }
            </a>
          ))
        }
      </div>

      <div className="w-tab-content">
        { sections.map((section, index) => (
            <div
              key={index}
              data-w-tab={`Tab ${index + 1}`}
              className={classnames("w-tab-pane", {"w--tab-active": index === selected})}
              id={`w-tabs-1-data-w-pane-${index}`}
              role="tabpanel"
              aria-labelledby={`w-tabs-1-data-w-tab-${index}`}
              style={index === selected ? { opacity: 1, transition: "opacity 300ms ease 0s" } : {}}
            >
              { index === selected
                ? section[showing]
                : null
              }
            </div>
          ))
        }
      </div>
    </div>
  );
}

export default Tabs;