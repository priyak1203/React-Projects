import React, { useRef, useEffect, useState } from 'react';

import { useGlobalContext } from '../context';

const Submenu = () => {
  const container = useRef(null);
  const [columns, setColumns] = useState('col-2');

  const {
    isSubmenuOpen,
    page: { page, links },
    location,
  } = useGlobalContext();

  useEffect(() => {
    setColumns('col-2');
    const { center, bottom } = location;
    const submenu = container.current;
    submenu.style.left = `${center}px`;
    submenu.style.top = `${bottom}px`;

    if (links.length === 3) {
      setColumns('col-3');
    }

    if (links.length > 3) {
      setColumns('col-4');
    }
  }, [location, page, links]);

  return (
    <aside
      className={`${isSubmenuOpen ? 'submenu show' : 'submenu'}`}
      ref={container}
    >
      <section>
        <h4>{page}</h4>
        <div className={`submenu-center ${columns}`}>
          {links.map((link, index) => {
            const { icon, label, url } = link;
            return (
              <a href={url} key={index}>
                {icon}
                {label}
              </a>
            );
          })}
        </div>
      </section>
    </aside>
  );
};

export default Submenu;
