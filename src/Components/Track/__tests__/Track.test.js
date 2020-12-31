import checkPropTypes from 'check-prop-types';
import React from 'react';
import { shallow } from 'enzyme';

import Track from '../Track';

const setUp = (props={}) => {
  return shallow(<Track {...props} />);
}

const checkProps = (component, expectedProps) => {
  const propsErr = checkPropTypes(component.propTypes, expectedProps, 'props', component.Name);
  return propsErr;
};

const findByTestAtrr = (component, attr) => {
  const wrapper = component.find(`[data-test='${attr}']`);
  return wrapper
};

describe('Track Component', () => {

  let wrapper;
  let onAdd = jest.fn();
  let onRemove = jest.fn();
  const props = {
    track : {
      name: 'Example Name',
      artist: 'Example Artist',
      album: 'Example Album'
    },
    onAdd,
    onRemove,
    isRemoval : false
  };

  describe('Checking PropTypes', () => {

    it('Should NOT throw a warning', () => {
      const expectedProps = props;
      const propsError = checkProps(Track, expectedProps);
      expect(propsError).toBeUndefined();
    });
  });

  describe('Renders and calls', () => {
    
    beforeEach(() => {
      wrapper = setUp(props);
      onAdd.mockClear();
      onRemove.mockClear();
    });
  
    it('Should Render a track name', ()=>{
      const heading = findByTestAtrr(wrapper, 'trackName');
      expect(heading.length).toBe(1);
    });
  
    it('Should Render a track artist and album', ()=>{
      const paragraph = findByTestAtrr(wrapper, 'trackArtistAndAlbum');
      expect(paragraph.length).toBe(1);
    });
  
    it('Should call onAdd function', ()=>{
      const mockFn = onAdd;
      const button = wrapper.find('.Track-action');
      button.simulate('click');
      expect(mockFn).toHaveBeenCalled();
      expect(button.length).toBe(1);
    });
  
    it('Should call onRemove function', ()=>{
      let propsIsRemoval = {...props, isRemoval:true};
      wrapper = setUp(propsIsRemoval)
      const mockFn = onRemove;
      const button = wrapper.find('.Track-action');
      button.simulate('click');
      expect(mockFn).toHaveBeenCalled();
      expect(button.length).toBe(1);
    });
  });

});