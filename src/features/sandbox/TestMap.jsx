import React from 'react';
import GoogleMapReact from 'google-map-react';
import { GOOGLE_MAPS } from '../../app/config/keys';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

const SimpleMap = ({ location }) => {

    return (
        // Important! Always set the container height explicitly
        <div style={{ height: '100vh', width: '100%' }}>
            <GoogleMapReact
                bootstrapURLKeys={{ key: GOOGLE_MAPS }}
                center={location.center}
                zoom={location.zoom}
            >
                <AnyReactComponent lat={location.center.lat} lng={location.center.lng} text="My Marker" />
            </GoogleMapReact>
        </div>
      );
}

export default SimpleMap