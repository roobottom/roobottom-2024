---
title: Site wrapper
---
All pages are contained by a single wrapper. This is designed to be as flexible as possible so you can override various blocks, depending on the view.

## Structure
``` {.language-html}
<html>
    <head>
        {% block stylesheets %}
        <!-- default stylesheets are called here -->
        {% endblock %}
    </head>

    <body class="{% block bodyClasses %}{% endblock }">
        {% block body %}

            {% block accessibilityMenu %}
            <!-- default accessibiluty menu -->
            {% endblock %}

            {% block siteHeader %}
            <header class="site-header"><!-- default site header --></header>
            {% endblock %}

            {% block main %}
            <main>
                {% block beforeContent %}
                 <!-- default before content -->
                {% endblock %}

                {% block content %}
                <!-- default content -->
                {{ content | safe }}
                {% endblock %}
            </main>
            {% endblock %}

            {% block siteFooter %}
            <footer class="site-footer"><!-- default site footer --></footer>
            {% endblock %}

            {% block scripts %}
            <!-- default scripts -->
            {% endblock %}

        {% endblock %}
    </body>
</html>
```

## Blocks
Each block can be overridden, or, for those blocks with default content, extended by calling `{{ super() }}`.

| Block name | Purpose | Has default content? |
| :- | :- | -: |
| `stylesheets` | Part of the `<head>`, allows calling of per-page stylesheets | yes |
| `bodyClasses` | Apply class names to `<body>` | no |
| `body` | Extend or override `<body>` | yes |
| `accessibilityMenu` | Extend or orverride the default a11y menu  | yes |
| `siteHeader` | Extend or orverride the site `<header>`  | yes |
| `main` | Extend or override  `<main>` | yes |
| `beforeContent` | Extend or override markup that appears before content | yes |
| `content` | Extend or override markup in content | yes |
| `siteFooter` | Extend or override the site `<footer>` | yes |
| `scripts` | Extend or override scripts that are called at the end of `<body>` | yes |