import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import { login } from '../../actions/auth';
import SubmitEmotePage from '../emotes/SubmitEmotePage';
import BrowseEmotesPage from '../emotes/BrowseEmotesPage';
import ChannelEmotesPage from '../emotes/ChannelEmotesPage';
import SubmissionsPage from '../emotes/SubmissionsPage';
import AboutPage from '../about/AboutPage';
import PrivateRoute from './PrivateRoute';
import ProfilePage from '../profile/ProfilePage';
import DownloadPage from '../download/DownloadPage';
import ContactPage from '../contact/ContactPage';
import TermsOfServicePage from '../legal/TermsOfServicePage';
import PrivacyPolicyPage from '../legal/PrivacyPolicyPage';
import EmoteGuidelinesPage from '../legal/EmoteGuidelinesPage';
import ReportEmotePage from '../report/ReportEmotePage';
import Home from '../../pages/Home';
import PageNotFound from '../errors/PageNotFound';

const Routes = ({ login }) => {
  useEffect(() => {
    login();
  }, [login]);

  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <PrivateRoute exact path="/submit" component={SubmitEmotePage} />
      <Route exact path="/browse" component={BrowseEmotesPage} />
      <PrivateRoute exact path="/submissions" component={SubmissionsPage} />
      <PrivateRoute exact path="/emotes" component={ChannelEmotesPage} />
      <Route exact path="/about" component={AboutPage} />
      <Route exact path="/users/:userId" component={ProfilePage} />
      <Route exact path="/contact" component={ContactPage} />
      <Route exact path="/downloads" component={DownloadPage} />
      <Route exact path="/privacy" component={PrivacyPolicyPage} />
      <Route exact path="/tos" component={TermsOfServicePage} />
      <Route exact path="/guidelines" component={EmoteGuidelinesPage} />
      <Route exact path="/emotes/:emote/report" component={ReportEmotePage} />
      <Route exact component={PageNotFound} />
    </Switch>
  );
};

export default connect(null, { login })(Routes);
