import React, { useState } from 'react';

import Layout from '../libs/layout/Layout';
import Select from '../libs/core/Select';
import { CircleDrawer, CRUD, Timer, Cells } from '../libs/7gui';

export default function Home() {
  const [curGui, setCurGui] = useState('Cells');

  let displayedGui = null;
  switch (curGui) {
    case 'Timer': {
      displayedGui = <Timer />;
      break;
    }
    case 'CRUD': {
      displayedGui = <CRUD />;
      break;
    }
    case 'Circle Drawer': {
      displayedGui = <CircleDrawer />;
      break;
    }
    case 'Cells': {
      displayedGui = <Cells />;
      break;
    }
    default: {
      // noop
    }
  }

  return (
    <Layout>
      <div className="container mx-auto px-4">
        {/* CONTROL PANEL */}

        <div className="flex justify-center p-4">
          <Select
            items={[
              'Counter',
              'Temperature Converter',
              'Flight Booker',
              'Timer',
              'CRUD',
              'Circle Drawer',
              'Cells',
            ]}
            value={curGui}
            setValue={setCurGui}
          />
        </div>

        {/* GUI DISPLAY */}

        <div className="flex justify-center p-4 w-full">{displayedGui}</div>
      </div>
    </Layout>
  );
}
