# Sales Pricer

Lightweight browser-based services pricer for Tyler sales quoting.

## What it does

- Captures suites being sold
- Tracks users and add-on count for SaaS quote context
- Lets the resource price only delivery services
- Calculates PM at 25% of delivery hours by default
- Converts fixed-fee conversion, integration, reporting, and fixed-fee PM work to hours using `$250/hour`
- Generates repeatable quote notes based on selected suites and add-ons

## Files

- `index.html`: app layout
- `styles.css`: visual design and responsive layout
- `app.js`: pricing rules, service recommendations, and note generation

## Important assumptions in this first version

- The recommended service hours in `app.js` are starter values and should be replaced with your real quoting standards.
- SaaS products are intentionally not included in the services total.
- The fixed-fee-to-hours conversion rate is always `$250/hour` for PM calculations.

## How to customize

- Update suites, add-ons, default notes, and recommended services in `app.js`
- Adjust the default services hourly rate in `index.html` if needed
- Add more standardized notes directly in the relevant suite or add-on object
