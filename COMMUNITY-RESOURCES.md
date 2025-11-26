# Community Resource Directory

## Overview

The Community Resource Directory is a curated collection of AI-related resources, tools, courses, and articles that are valuable to the AI CDMX community. The directory features sorting and filtering capabilities to help members find relevant resources quickly.

## How It Works

### Data Structure

Resources are stored in `data/resources.json` as a JSON array. Each resource has the following fields:

```json
{
  "title": "Resource Title",
  "description": "Brief description of the resource",
  "url": "https://example.com",
  "language": "english",
  "tags": ["tag1", "tag2", "tag3"],
  "dateAdded": "2025-01-15",
  "credits": [
    {
      "name": "Community Member Name",
      "url": "https://twitter.com/username"
    }
  ]
}
```

### Fields Explanation

- **title** (required): Name of the resource
- **description** (required): Brief description (1-2 sentences) of what the resource offers
- **url** (required): Valid URL to the resource
- **tags** (required): Array of tags for categorization. Common tags include:
  - `curso` - Online courses or training materials
  - `herramienta` - AI tools and applications
  - `artículo` - Articles and blog posts
  - `documentación` - Documentation and guides
  - `investigación` - Research papers and academic content
  - `video` - Video content
  - `dataset` - Datasets
  - `código` - Code repositories and libraries
- **dateAdded** (required): Date the resource was added in YYYY-MM-DD format
- **submittedBy** (optional): Name of the person who submitted the resource

## Adding a New Resource

### Option 1: Edit the JSON file directly

1. Open `data/resources.json`
2. Add a new object to the array following the structure above
3. Ensure the JSON is valid (use a JSON validator if needed)
4. Test locally with `make serve`
5. Submit a pull request

### Option 2: Submit via GitHub Issue (Coming soon)

We plan to add a GitHub issue template that will automatically add resources to the JSON file.

## Example Entry

```json
{
  "title": "Fast.ai Practical Deep Learning Course",
  "description": "Free course covering practical deep learning for coders with hands-on projects.",
  "url": "https://course.fast.ai/",
  "tags": ["curso", "código"],
  "dateAdded": "2025-01-15",
  "submittedBy": "María González"
}
```

## Frontend Features

The community resources page (`/community-resources/`) includes:

### Sorting
- **Newest First** (default): Shows most recently added resources first
- **Oldest First**: Shows earliest added resources first

### Filtering
- **Filter by Tag**: Click on any tag to show only resources with that tag
- **Clear Filter**: Remove active filters to show all resources

## File Locations

- **Data file**: `data/resources.json`
- **Page content**: `content/community-resources/index.md`
- **Layout**: `layouts/community-resources/single.html`
- **Documentation**: `COMMUNITY-RESOURCES.md` (this file)

## Rosey Localization

The page supports English and Spanish through Rosey. Translatable strings are marked with `data-rosey` attributes. After adding new text content:

1. Run `npm run rosey:generate` to extract translatable strings
2. Add English translations to `rosey/locales/en.json`
3. Build with `npm run build`

## Guidelines for Resource Submission

### Quality Standards
- Resources should be relevant to AI, machine learning, or related technologies
- Links must be active and working
- Prefer free or open-access resources when possible
- Include a clear, concise description

### Tag Usage
- Use 1-3 tags per resource
- Use existing tags when applicable to maintain consistency
- Propose new tags in your pull request if needed

### Content Policy
- No affiliate links or paid promotions without disclosure
- Resources should provide genuine value to the community
- Commercial tools are allowed if they have free tiers or are widely used in the community

## Maintenance

Regular maintenance tasks:
- Verify links are still active (quarterly)
- Remove outdated or defunct resources
- Update descriptions if resources significantly change
- Add new relevant tags as the community grows
