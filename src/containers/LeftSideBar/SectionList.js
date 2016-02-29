import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import update from 'react/lib/update';
import {SectionMenuItem} from 'components';
import {sectionsActions} from 'redux/modules';
import DragSortItem from '../Common/DragSortItem';
import history from 'helpers/history';

@connect(
  state => ({
    sections: state.sections.list,
    currentSectionId: state.sections.currentSectionId
  }),
  { ...sectionsActions })
export default class SectionList extends React.Component {
  static propTypes = {
    sections: PropTypes.array.isRequired
  };

  render() {
    const {sections, currentSectionId} = this.props;
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

    const handleSectionClick = (sectionId) => {
      const path = `/section/${sectionId}`;
      history.pushState(null, path);
      selectSection(sectionId);
    };

    return (
      <div>
        {
          sections.map((s, i) => 
            <DragSortItem key={s._id} type="section" index={i} id={s._id} moveItem={moveItem} saveItems={saveSectionsOrder}>
              <SectionMenuItem section={s} isCurrent={currentSectionId===s._id} 
                               onClick={()=>handleSectionClick(s._id)}/>
            </DragSortItem>
            )
        }
      </div>
    );

  }

}