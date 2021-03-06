import * as React from 'react';

import { StateAndUpdater, StateProvider, ObjectWatcher } from 'reenhance-components';


interface OuterProps {
  src: string;
}

const LoadedState = StateProvider<boolean>(false);
const ImageRefWatcher = ObjectWatcher<React.RefObject<any>>(React.createRef(), 'current');

export const ImageWithLoading: React.StatelessComponent<OuterProps> =
  ({ src }) => (
    <LoadedState>
      {({ state: loaded, setState: setLoaded }: StateAndUpdater<boolean>) => (
        <ImageRefWatcher>
          {(imageRef) => {
            const complete = imageRef.current && imageRef.current.complete;

            return (
              <div>
                {!complete ? (
                  <svg width="100" height="100" viewBox="0 0 100 100">  
                    <rect width="100" height="100" rx="10" ry="10" fill="#CCC" />
                  </svg>
                ) : null}
                <img
                  src={src}
                  style={!complete ? { visibility: 'hidden' } : {}}
                  ref={imageRef}
                  onLoad={() => setLoaded(true)}
                />
              </div>
            );
          }}
        </ImageRefWatcher>
      )}
    </LoadedState>
  );


const IdPickerState = StateProvider(100);

export const IdImage = () => (
  <IdPickerState>
    {({ state: id, setState: setId }: any) => (
      <div>
        <input type="number" value={id} onChange={e => setId(e.target.value)} /><br/>
        <ImageWithLoading key={id} src={'https://picsum.photos/100/100/?image=' + id} />
      </div>
    )}
  </IdPickerState>
);
