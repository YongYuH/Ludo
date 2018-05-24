// @flow
import React, { Component } from 'react';
import styled from 'styled-components';
import { translate } from 'react-i18next';

const Button = styled.button`
  background-color: #b2b2b2;
  border: none;
  border-radius: 25px;
  color: white;
  height: 20px;
  width: 80px;
`;

const Title = styled.span`
  margin-right: 20px;
`;

const Wrapper = styled.div`
  align-items: center;
  color: white;
  display: flex;
  font-size: 30px;
  font-weight: bold;
  justify-content: center;
  margin-left: 240px;
  padding-top: 30px;
  text-align: center;
`;

type Props = {
  fetchSingleTemplateRequestAction: Func,
  t: Func,
  templateInfo: object,
};

class TemplateTitle extends Component<Props> {
  componentDidMount() {
    const { fetchSingleTemplateRequestAction } = this.props;
    const viewingTemplateId = window.location.search.split('templateId=')[1];
    fetchSingleTemplateRequestAction(viewingTemplateId);
  }

  render() {
    const {
      t,
      templateInfo,
    } = this.props;
    return (
      <Wrapper>
        <Title>
          {templateInfo.title}
        </Title>
        <Button>
          {t('edit')}
        </Button>
      </Wrapper>
    );
  }
}

export default translate(['statistic'])(TemplateTitle);
