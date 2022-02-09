import { ChevronDownIcon, ChevronUpIcon, Text } from '@pancakeswap/uikit';
import './expandablesectionbutton.scss';

const ExpandableSectionButton = ({ onClick, expanded }) => {

  return (
    <div className='expandable-section-button-wrapper' aria-label={'Hide or show expandable content'} role="button" onClick={() => onClick()}>
      <Text color="primary" bold>
        {expanded ? 'Hide' : 'Details'}
      </Text>
      {expanded ? <ChevronUpIcon /> : <ChevronDownIcon />}
    </div>
  )
}

ExpandableSectionButton.defaultProps = {
  expanded: false,
}

export default ExpandableSectionButton
