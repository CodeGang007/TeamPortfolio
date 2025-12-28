# Firebase Data Structure for IT Solutions Company

## Project Requests Collection: `project_requests`

| Field | Type | Required | Description | Example |
|-------|------|----------|-------------|---------|
| **id** | string | Auto | Document ID | `proj_abc123` |
| **projectName** | string | ✅ | Project title | "E-commerce Website Development" |
| **description** | string | ✅ | Detailed project description | "Need a full-stack e-commerce platform..." |
| **category** | string | ✅ | Main project category | "Full Stack Development" |
| **subCategories** | array | ❌ | Selected technologies/skills | ["React", "Node.js", "MongoDB"] |
| **deliveryTime** | string | ✅ | Expected completion date | "2024-03-15" |
| **budget** | string | ✅ | Project budget amount | "5000" |
| **currency** | string | ✅ | Currency code | "USD" |
| **additionalNotes** | string | ❌ | Extra requirements | "Need responsive design and SEO..." |
| **projectLinks** | object | ❌ | Reference links | See below |
| **imageUrls** | array | ❌ | Uploaded image URLs | ["https://storage.../img1.jpg"] |
| **attachmentUrls** | array | ✅ | Document URLs with metadata | See below |
| **isDraft** | boolean | Auto | Whether project is saved as draft | true/false |
| **draftSavedAt** | timestamp | Auto | Last time draft was saved | Firebase timestamp |
| **initiatedAt** | timestamp | Auto | When project was published | null (if draft) |
| **collectedAt** | timestamp | ❌ | When requirements collected | null (initially) |
| **inProgressAt** | timestamp | ❌ | When development started | null (initially) |
| **inTransactionAt** | timestamp | ❌ | When payment processing started | null (initially) |
| **completedAt** | timestamp | ❌ | When project completed | null (initially) |
| **assignedTo** | array | ❌ | Team members assigned (after initiation) | ["dev_john123", "designer_sarah456"] |
| **estimatedHours** | number | ❌ | Time estimation | 120 |
| **actualHours** | number | ❌ | Time spent | 95 |
| **priority** | string | ❌ | Project priority | "high" |
| **clientId** | string | Auto | User who created request | "user_xyz789" |
| **projectType** | string | ❌ | Type of engagement | "fixed_price" / "hourly" |
| **communicationPreference** | string | ❌ | Additional communication channel | "slack" / "discord" / "whatsapp" |

### Project Links Object Structure:
```json
{
  "github": "https://github.com/user/repo",
  "figma": "https://figma.com/file/...",
  "website": "https://demo.example.com",
  "documentation": "https://docs.google.com/...",
  "other": "https://notion.so/..."
}
```

### Attachment URLs Array Structure:
```json
[
  {
    "name": "requirements.pdf",
    "url": "https://storage.../requirements.pdf",
    "type": "application/pdf",
    "size": "2.5 MB"
  }
]
```

## Status Workflow (Timestamp-based):

| Stage | Field | Description | When Updated |
|-------|-------|-------------|-------------|
| **Draft** | isDraft: true | Project saved but not published | Auto-save while editing |
| **Initiated** | initiatedAt | Project published by client | When user clicks "Publish" |
| **Collected** | collectedAt | Requirements gathered & clarified | Admin updates manually |
| **In Progress** | inProgressAt | Development work started | Admin updates when assigning team |
| **In Transaction** | inTransactionAt | Payment processing | Admin updates when invoicing |
| **Completed** | completedAt | Project delivered | Admin updates on completion |

**Draft Logic:** 
- `isDraft: true` + `initiatedAt: null` = Draft
- `isDraft: false` + `initiatedAt: timestamp` = Published

**Current Status Logic:** If not draft, the most recent non-null timestamp determines current status.

## Additional Collections for Future:

### Team Members: `team_members`
| Field | Type | Description |
|-------|------|-------------|
| name | string | Developer name |
| skills | array | Technologies they know |
| hourlyRate | number | Cost per hour |
| availability | string | Current status |

### Project Updates: `project_updates`
| Field | Type | Description |
|-------|------|-------------|
| projectId | string | Reference to project |
| message | string | Update description |
| timestamp | timestamp | When update was made |
| author | string | Who made the update |

### Invoices: `invoices`
| Field | Type | Description |
|-------|------|-------------|
| projectId | string | Reference to project |
| amount | number | Invoice amount |
| status | string | paid/pending/overdue |
| dueDate | timestamp | Payment due date |

## Business Enhancement Suggestions:

### 1. Client Communication
- **Slack/Discord integration** for real-time updates
- **Email notifications** for status changes
- **Client portal** to view project progress

### 2. Payment & Contracts
- **Milestone-based payments** (25% upfront, 50% midway, 25% completion)
- **Digital contracts** with e-signatures
- **Automatic invoice generation**

### 3. Quality Assurance
- **Code review checklist** before moving to in_transaction
- **Client approval** required before completion
- **Testing phase** between in_progress and in_transaction

### 4. Analytics & Reporting
- **Time tracking** per team member
- **Profit margins** calculation
- **Client satisfaction** ratings
- **Project success metrics**

### 5. Future Collections to Consider:
```
clients/
├── contact_info
├── project_history
├── payment_history
└── preferences

contracts/
├── terms_and_conditions
├── payment_schedule
├── deliverables
└── signatures

time_logs/
├── team_member_id
├── project_id
├── hours_worked
└── task_description
```