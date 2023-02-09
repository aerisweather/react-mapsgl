import { AnyMapController } from '@aerisweather/mapsgl';
import * as React from 'react';

export const MapControllerContext = React.createContext<AnyMapController | undefined>(undefined) as React.Context<any>;

// tslint:disable-next-line:no-any
export function withMapController(Component: React.ComponentClass<any>) {
    return function MappedComponent<T>(props: T) {
        return (
            <MapControllerContext.Consumer>
                {(controller) => <Component controller={controller} {...props} />}
            </MapControllerContext.Consumer>
        );
    };
}
