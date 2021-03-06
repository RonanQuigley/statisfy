import chai from 'chai';
import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Charts from 'charts/index';
import UI from 'common/react/common/components/ui';
import Header from 'common/react/common/components/header';
import chaiEnzyme from 'chai-enzyme';
import Content from 'common/react/charts/components/content';
import Chart from 'common/react/charts/components/chart';

chai.use(chaiEnzyme());
Enzyme.configure({ adapter: new Adapter() });

const expect = chai.expect;

describe('react - charts - index', () => {
    let wrapper;
    beforeEach(() => {
        /* the component under test is wrapped several H.O.C's. We need 
        to repeatedly use dive to access the component we want to test */
        wrapper = shallow(
            <Charts data={{}} ssrID={'Fake'} header={'Fake'} map={new Map()} />
        )
            .dive()
            .dive();
    });
    it('should render', () => {
        wrapper = shallow(
            <Charts data={{}} ssrID={'fake'} header={'Fake'} map={new Map()} />
        );
        expect(wrapper.isEmptyRender()).to.be.false;
    });
    describe('UI', () => {
        let ui;
        beforeEach(() => {
            ui = wrapper.find(UI);
        });
        it('should have a value attribute', () => {
            expect(ui.props().value).to.be.a('number');
        });
        it('should have an onChange attribute', () => {
            expect(ui.props().onChange).to.be.a('function');
        });
        it('should have a label keys attribute', () => {
            expect(ui.props().labelKeys).to.be.a('array');
        });
    });

    describe('Header', () => {
        let header;
        beforeEach(() => {
            header = wrapper.find(Header);
        });
        it('should exist', () => {
            expect(header).to.have.length(1);
        });
        it('should have a header attribute', () => {
            expect(header.props().header).to.be.a('string');
        });
    });
    describe('Content', () => {
        let content;
        beforeEach(() => {
            content = wrapper.find(Content);
        });
        it('should exist', () => {
            expect(content).to.have.length(1);
        });
        it('should have a value attribute', () => {
            expect(content.props().value).to.be.a('number');
        });
        it('should have a data attribute', () => {
            expect(content.props().data).to.be.a('object');
        });
    });
});
