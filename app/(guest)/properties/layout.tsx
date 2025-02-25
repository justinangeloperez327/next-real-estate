

import { ReactNode } from 'react';

const PropertiesLayout = ({ children }: { children: ReactNode }) => {
    return (
        <div>
            <main className='min-h-screen'>{children}</main>
        </div>
    );
};

export default PropertiesLayout;