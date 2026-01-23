# TODO: Integrated Reporting System for Cerita Jiwa

## Backend Implementation
- [ ] Add report API endpoints in server.js (create, list, update, reply, escalate)
- [ ] Implement localStorage-based data storage for reports, replies, audit logs

## Frontend Pages (No Sidebar)
### User Pages
- [ ] Create Report page (/reports/create)
- [ ] Report History page (/reports/history)

### CS Pages
- [ ] CS Dashboard (/support/dashboard)
- [ ] Handle Report page (/support/reports/:id)
- [ ] CS Profile page (/support/profile)

### Admin Pages
- [ ] Admin Report Dashboard (/admin/reports)
- [ ] Report Decision page (/admin/reports/:id)

## Components
- [ ] ReportForm component
- [ ] ReportList component
- [ ] ReportDetail component
- [ ] StatusBadge component
- [ ] ReplyForm component
- [ ] AuditLog component

## Routing & Layout
- [ ] Add protected routes in App.jsx for all new pages
- [ ] Create custom layout without sidebar for report pages
- [ ] Update role-based access controls

## Real-time & Features
- [ ] Implement polling for status updates
- [ ] Add audit logging for CS/Admin actions
- [ ] Add notifications for status changes
- [ ] Test role-based access and data flow

## Testing & Polish
- [ ] Test end-to-end data flow (User -> CS -> Admin)
- [ ] Ensure empathetic UI/UX for mental health context
- [ ] Add error handling and validation
