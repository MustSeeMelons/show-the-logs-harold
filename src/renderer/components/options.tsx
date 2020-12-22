import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import styled from "styled-components";
import { IBaseAction } from "../actions";
import {
  cancelFilterAction,
  filterLogsAction,
} from "../actions/global-actions";
import { IState, refStore, REF_KEY } from "../store/store";
import { FaArrowUp, FaArrowDown, FaBan } from "react-icons/fa";
import { TitleText } from "./text";
import { SmollButton } from "./smoll-button";

const Container = styled.div`
  display: flex;
  width: 100%;
  border-bottom: 1px solid ${(p) => p.theme.colors.primary.accentText};
  flex-wrap: nowrap;
  height: 35px;
  justify-items: center;
`;

const Label = styled.label`
  box-sizing: border-box;
  border: none;
  padding: 5px;
  outline: none;
  color: ${(p) => p.theme.colors.primary.lightText};
  background-color: ${(p) => p.theme.colors.primary.dark};
  margin: auto;
`;

const Input = styled.input`
  box-sizing: border-box;
  border: none;
  margin: 5px;
  outline: none;
  color: ${(p) => p.theme.colors.primary.lightText};
  background-color: ${(p) => p.theme.colors.primary.dark};
  flex-grow: 1;
  font-family: "Lucida Console";
`;

const FilterControlContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  padding: 5px;
`;

const NoMatchText = styled(TitleText)`
  text-align: right;
`;

interface IOptionComponentProps {}

interface IOptionStateProps {
  maxLineNumber?: number;
  hasLogs: boolean;
  filteredLogs?: string[];
  filteredIndex?: number;
  filterValue: string;
  filterElementsUpdate: number;
}

interface IOptionDispatchProps {
  filter: (filterValue: string) => void;
  cancelFilter: () => void;
}

type OptionProps = IOptionComponentProps &
  IOptionStateProps &
  IOptionDispatchProps;

const Options: React.FC<OptionProps> = (props) => {
  const [tempFilterValue, setTempFilterValue] = useState("");
  const [activeFilterElement, setActiveFilterElement] = useState(0);

  useEffect(() => {
    if (activeFilterElement !== 0) {
      setActiveFilterElement(0);
      const hasElements =
        refStore[REF_KEY.FILTER_ELEMENTS] &&
        (refStore[REF_KEY.FILTER_ELEMENTS] as HTMLElement[]).length > 0;

      hasElements &&
        (refStore[REF_KEY.FILTER_ELEMENTS][0] as HTMLElement).scrollIntoView({
          behavior: "smooth",
        });
    }
  }, [props.filterElementsUpdate]);

  const renderFilterControls = () => {
    if (props.filteredLogs && props.filteredLogs.length > 0) {
      const elements = refStore[REF_KEY.FILTER_ELEMENTS] as HTMLElement[];
      const elementCount = elements?.length || 0;

      const stateText = `${activeFilterElement + 1}/${elementCount}`;

      const nextOccurance = () => {
        const next = (activeFilterElement + 1) % elements.length;
        elements[next].scrollIntoView({ behavior: "smooth" });
        setActiveFilterElement(next);
      };

      const prevOccurance = () => {
        const prev = (activeFilterElement - 1) % elements.length;
        elements[prev].scrollIntoView({ behavior: "smooth" });
        setActiveFilterElement(prev);
      };

      return (
        <FilterControlContainer>
          <SmollButton onClick={prevOccurance}>
            <FaArrowUp size={20} />
          </SmollButton>
          <SmollButton onClick={nextOccurance}>
            <FaArrowDown size={20} />
          </SmollButton>
          <TitleText>{stateText}</TitleText>
          <SmollButton
            onClick={() => {
              props.cancelFilter();
              setTempFilterValue("");
            }}
          >
            <FaBan size={20} />
          </SmollButton>
        </FilterControlContainer>
      );
    } else if (props.filteredLogs && props.filteredLogs.length === 0) {
      return <NoMatchText>No Matches</NoMatchText>;
    }

    return null;
  };

  return (
    <Container>
      {props.hasLogs && (
        <>
          <Label htmlFor="filter">Filter:</Label>
          <Input
            title="Filter logs by content, enter to do filter"
            type="text"
            id="filter"
            placeholder="..."
            value={tempFilterValue}
            onChange={(e) => {
              setTempFilterValue(e.target.value);
            }}
            onKeyUp={(e) => {
              if (e.key === "Enter") {
                props.filter(tempFilterValue);
              }
            }}
          />
          {renderFilterControls()}
        </>
      )}
    </Container>
  );
};

const mapStateToProps = (state: IState): IOptionStateProps => {
  return {
    maxLineNumber: state.globalReducer.logFile?.totalLineCount,
    hasLogs: !!state.globalReducer.logFile,
    filteredLogs: state.globalReducer.filteredLogs,
    filteredIndex: state.globalReducer.filteredIndex,
    filterValue: state.globalReducer.filterValue,
    filterElementsUpdate: state.globalReducer.filterElementsUpdate,
  };
};

const mapDispatchToProps = (
  dispatch: ThunkDispatch<IState, undefined, IBaseAction>
): IOptionDispatchProps => {
  return {
    filter: (filterValue: string) => {
      dispatch(filterLogsAction(filterValue));
    },
    cancelFilter: () => {
      dispatch(cancelFilterAction());
    },
  };
};
const ConnectedOptions = connect(mapStateToProps, mapDispatchToProps)(Options);

export { ConnectedOptions as Options };
