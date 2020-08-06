import React from 'react';
import { shallow } from 'enzyme';
import Track from '../Track';


const findByTestAtrr = (component, attr) => {
    const wrapper = component.find(`[data-test='${attr}']`);
    return wrapper
};

describe('Track Components', () => {

    let wrapper;
    beforeEach(() => {
        const props = {
            name: 'Example Name',
            artist: 'Example Artist',
            album: 'Example Album'
        };
        wrapper = shallow(<Track {...props} />);
    });
 
    it('Should Render a track name', ()=>{
        const button = findByTestAtrr(wrapper, 'Track-Name');
        expect(button.length).toBe(1);
    })
})