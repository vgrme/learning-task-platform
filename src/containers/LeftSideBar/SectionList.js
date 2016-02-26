import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import update from 'react/lib/update';
import {SectionMenuItem} from 'components';
import {sectionsActions} from 'redux/modules';
import DragSortItem from '../Common/DragSortItem';


@connect(
  state => ({
    sections: state.sections.list
  }),
  { ...sectionsActions })
export default class LeftSideBar extends React.Component {
  static propTypes = {
    sections: PropTypes.array.isRequired
  };

  render() {
    const {sections} = this.props;
    const {selectSection, saveAllSections, reorderSections} = this.props;   //from action

    const moveItem = (dragIndex, hoverIndex) => {
      const dragItem = sections[dragIndex];

      var newSections = update(sections, {
          $splice: [
            [dragIndex, 1],
            [hoverIndex, 0, dragItem]
          ]
        });
      
      reorderSections(newSections);
    };

    const saveSectionsOrder = () => {
      const newSectionsList = sections.map((t, i) => {
        t.order = i+1;
        return t;
      });
      saveAllSections(newSectionsList, 'reorder');
    };

    return (
      <div>
        {
          sections.map((s, i) => 
            <DragSortItem key={s._id} type="section" index={i} id={s._id} moveItem={moveItem} saveItems={saveSectionsOrder}>
              <SectionMenuItem section={s} onClick={()=>selectSection(s._id)}/>
            </DragSortItem>
            )
        }
      </div>
    );

  }

}