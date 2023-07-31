import React, { Suspense } from "react";
import { Redirect, Switch } from "react-router-dom";
import { ContentRoute, LayoutSplashScreen } from "./_metronic/layout";
import UserHomeContainer from "./containers/user/home/UserHomeContainer";
import CampaignContainer from "./containers/campaign/CampaignContainer";
import CampaignsContainer from "./containers/campaigns/CampaignsContainer";
import { BuilderPage } from "./common/shared/builder/BuilderPage";
import CreateRuleContainer from "./containers/rule/area/ruledefinition/CrateRuleContainer";
import CodeContainer from "./containers/thirdpartycode/CodeContainer";
import ContactContainer from "./containers/contact/ContactContainer";
import DashBoardContainer from "./containers/campaigndashboard/DashBoardContainer";
import DashBoardDetailContainer from "./containers/campaigndashboard/area/DashBoardDetailContainer";
import CustomerPolicySaleContainer from "./containers/customerpolicysale/CustomerPolicySaleContainer";
import AdminContainer from "./containers/admin/AdminContainer";
import TaskManagementContainer from "./containers/taskmanagement/TaskManagementContainer";
import SsoTasksContainer from "./containers/taskmanagement/area/sso/SsoTasksContainer";

export default function BasePage() {
  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <Switch>
        {<Redirect exact from="/" to="/cm-campaigns" /> || (
          <Redirect exact from="/cm" to="/cm-campaigns" />
        )}
        <ContentRoute path="/cm" component={UserHomeContainer} />
        {/*<ContentRoute path="/cm-dashboard" component={UserHomeContainer} />*/}
        <ContentRoute path="/cm-campaign" component={CampaignContainer} />
        <ContentRoute path="/cm-campaigns" component={CampaignsContainer} />
        <ContentRoute path="/cm-rule" component={CreateRuleContainer} />
        <ContentRoute path="/cm-code" component={CodeContainer} />
        <ContentRoute path="/cm-contact" component={ContactContainer} />
        <ContentRoute path="/cm-dashboard" component={DashBoardContainer} />
        <ContentRoute path="/cm-dashboard-detail" component={DashBoardDetailContainer} />
        <ContentRoute path="/cm-policy-sale" component={CustomerPolicySaleContainer} />
        <ContentRoute path="/cm-admin" component={AdminContainer} />
        <ContentRoute path="/builder" component={BuilderPage} />
        <ContentRoute path="/cm-task-management" component={TaskManagementContainer}/>
        <ContentRoute path="/task-management" component={SsoTasksContainer}/>
        <Redirect to="error/error-v1" />
      </Switch>
    </Suspense>
  );
}
