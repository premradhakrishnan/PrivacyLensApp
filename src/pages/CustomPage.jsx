import React from 'react';
import { Box, Typography } from '@mui/material';
import { brandColors } from '../utils/constants';

const CustomPage = () => {
    return (
        <Box>
            <>
                <meta charSet="utf-8" />
                <meta name="generator" content="quarto-1.5.57" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1.0, user-scalable=yes"
                />
                <title>PrivacyLens Consistency Assessment and Gemini Evaluation</title>
                <style
                    dangerouslySetInnerHTML={{
                        __html:
                            '\ncode{white-space: pre-wrap;}\nspan.smallcaps{font-variant: small-caps;}\ndiv.columns{display: flex; gap: min(4vw, 1.5em);}\ndiv.column{flex: auto; overflow-x: auto;}\ndiv.hanging-indent{margin-left: 1.5em; text-indent: -1.5em;}\nul.task-list{list-style: none;}\nul.task-list li input[type="checkbox"] {\n  width: 0.8em;\n  margin: 0 0.8em 0.2em -1em; /* quarto-specific, see https://github.com/quarto-dev/quarto-cli/issues/4556 */ \n  vertical-align: middle;\n}\n/* CSS for citations */\ndiv.csl-bib-body { }\ndiv.csl-entry {\n  clear: both;\n  margin-bottom: 0em;\n}\n.hanging-indent div.csl-entry {\n  margin-left:2em;\n  text-indent:-2em;\n}\ndiv.csl-left-margin {\n  min-width:2em;\n  float:left;\n}\ndiv.csl-right-inline {\n  margin-left:2em;\n  padding-left:1em;\n}\ndiv.csl-indent {\n  margin-left: 2em;\n}'
                    }}
                />
                <link href="site_libs/quarto-html/tippy.css" rel="stylesheet" />
                <link
                    href="site_libs/quarto-html/quarto-syntax-highlighting.css"
                    rel="stylesheet"
                    id="quarto-text-highlighting-styles"
                />
                <link href="site_libs/bootstrap/bootstrap-icons.css" rel="stylesheet" />
                <link
                    href="site_libs/bootstrap/bootstrap.min.css"
                    rel="stylesheet"
                    id="quarto-bootstrap"
                    data-mode="light"
                />
                <link
                    href="site_libs/quarto-contrib/glightbox/glightbox.min.css"
                    rel="stylesheet"
                />
                <link
                    href="site_libs/quarto-contrib/glightbox/lightbox.css"
                    rel="stylesheet"
                />
                <meta
                    name="citation_title"
                    content="PrivacyLens Consistency Assessment and Gemini Evaluation"
                />
                <meta name="citation_author" content="The PrivacyLens Team" />
                <meta name="citation_language" content="en" />
                <meta
                    name="citation_reference"
                    content="citation_title=Literate programming;,citation_author=Donald E. Knuth;,citation_publication_date=1984-05;,citation_cover_date=1984-05;,citation_year=1984;,citation_fulltext_html_url=https://doi.org/10.1093/comjnl/27.2.97;,citation_issue=2;,citation_doi=10.1093/comjnl/27.2.97;,citation_issn=0010-4620;,citation_volume=27;,citation_journal_title=Comput. J.;,citation_publisher=Oxford University Press, Inc.;"
                />
                <meta
                    name="citation_reference"
                    content="citation_title=Generative AI in search: Let google do the searching for you;,citation_author=undefined Google;,citation_publication_date=2024;,citation_cover_date=2024;,citation_year=2024;,citation_fulltext_html_url=https://blog.google/products/search/generative-ai-google-search-may-2024/;"
                />
                <meta
                    name="citation_reference"
                    content="citation_title=AI overviews deliver MORE traffic than featured snippets, according to study;,citation_author=Daniel Højris Bæk;,citation_publication_date=2025;,citation_cover_date=2025;,citation_year=2025;,citation_fulltext_html_url=https://seo.ai/blog/ai-overviews-deliver-more-traffic-than-featured-snippets-according-to-study;"
                />
                <header
                    id="title-block-header"
                    className="quarto-title-block default toc-left page-columns page-full"
                >
                    <div className="quarto-title-banner page-columns page-full">
                        <div className="quarto-title column-body">
                            <h1 className="title">
                                PrivacyLens Consistency Assessment and Gemini Evaluation
                            </h1>
                        </div>
                        <div className="quarto-title-meta-container">
                            <div className="quarto-title-meta-column-start">
                                <div className="quarto-title-meta-author">
                                    <div className="quarto-title-meta-heading author-heading">
                                        <em>Author</em>
                                    </div>
                                    <div className="quarto-title-meta-heading affiliation-heading">
                                        <em>Affiliation</em>
                                    </div>

                                    <div className="quarto-title-meta-contents author-content">
                                        <p className="author"><i>The PrivacyLens Team</i></p>
                                    </div>

                                    <div className="quarto-title-meta-contents affiliation-content">
                                        <p className="affiliation"><i>School of Information, UC Berkeley</i></p>
                                    </div>
                                </div>
                            </div>
                            <div className="quarto-title-meta-column-end quarto-other-formats-target">
                                <div className="quarto-alternate-formats">
                                </div>
                            </div>
                        </div>
                        <div className="quarto-other-links-text-target"></div>
                    </div>
                </header>
                <div
                    id="quarto-content"
                    className="page-columns page-rows-contents page-layout-article toc-left"
                >
                    <div id="quarto-sidebar-toc-left" className="sidebar toc-left">
                        <nav id="TOC" role="doc-toc" className="toc-active">
                            <h2 id="toc-title">Table of contents</h2>
                            <ul>
                                <li>
                                    <a
                                        href="#executive-summary"
                                        id="toc-executive-summary"
                                        className="nav-link active"
                                        data-scroll-target="#executive-summary"
                                    >
                                        <span className="header-section-number">1</span> Executive Summary
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#motivation-and-background"
                                        id="toc-motivation-and-background"
                                        className="nav-link"
                                        data-scroll-target="#motivation-and-background"
                                    >
                                        <span className="header-section-number">2</span> Motivation and
                                        Background
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#methodology"
                                        id="toc-methodology"
                                        className="nav-link"
                                        data-scroll-target="#methodology"
                                    >
                                        <span className="header-section-number">3</span> Methodology
                                    </a>
                                    <ul className="collapse">
                                        <li>
                                            <a
                                                href="#consistency-check"
                                                id="toc-consistency-check"
                                                className="nav-link"
                                                data-scroll-target="#consistency-check"
                                            >
                                                <span className="header-section-number">3.1</span> Consistency
                                                Check
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                href="#gemini-summary-evaluation"
                                                id="toc-gemini-summary-evaluation"
                                                className="nav-link"
                                                data-scroll-target="#gemini-summary-evaluation"
                                            >
                                                <span className="header-section-number">3.2</span> Gemini
                                                Summary Evaluation
                                            </a>
                                        </li>
                                    </ul>
                                </li>
                                <li>
                                    <a
                                        href="#results"
                                        id="toc-results"
                                        className="nav-link"
                                        data-scroll-target="#results"
                                    >
                                        <span className="header-section-number">4</span> Results
                                    </a>
                                    <ul className="collapse">
                                        <li>
                                            <a
                                                href="#llm-consistency-results-chat-gpt-vs.-gemini"
                                                id="toc-llm-consistency-results-chat-gpt-vs.-gemini"
                                                className="nav-link"
                                                data-scroll-target="#llm-consistency-results-chat-gpt-vs.-gemini"
                                            >
                                                <span className="header-section-number">4.1</span> LLM
                                                Consistency Results: Chat GPT vs.&nbsp;Gemini
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                href="#gemini-summary-findings"
                                                id="toc-gemini-summary-findings"
                                                className="nav-link"
                                                data-scroll-target="#gemini-summary-findings"
                                            >
                                                <span className="header-section-number">4.2</span> Gemini
                                                Summary Findings
                                            </a>
                                        </li>
                                    </ul>
                                </li>
                                <li>
                                    <a
                                        href="#discussion"
                                        id="toc-discussion"
                                        className="nav-link"
                                        data-scroll-target="#discussion"
                                    >
                                        <span className="header-section-number">5</span> Discussion
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#conclusion"
                                        id="toc-conclusion"
                                        className="nav-link"
                                        data-scroll-target="#conclusion"
                                    >
                                        <span className="header-section-number">6</span> Conclusion
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#references"
                                        id="toc-references"
                                        className="nav-link"
                                        data-scroll-target="#references"
                                    >
                                        <span className="header-section-number">7</span> References
                                    </a>
                                </li>
                            </ul>
                            <div className="quarto-alternate-notebooks">
                                <h2>Notebooks</h2>
                                <ul>
                                    <li>
                                        <a href="index-preview.html">
                                            <i className="bi bi-journal-code" />
                                            Article Notebook
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </nav>
                    </div>
                    <div
                        id="quarto-margin-sidebar"
                        className="sidebar margin-sidebar zindex-bottom"
                    ></div>
                    <main
                        className="content quarto-banner-title-block"
                        id="quarto-document-content"
                    >
                        <div className="cell" data-hide="true">
                            <style
                                type="text/css"
                                dangerouslySetInnerHTML={{
                                    __html:
                                        "\n<!-- .quarto-title-block { -->\n<!-- background-color: #ffffff; -->\n<!-- padding: 20px; -->\n<!-- border-radius: 5px; -->\n<!-- } -->\n"
                                }}
                            />
                            <a
                                className="quarto-notebook-link"
                                id="nblink-1"
                                href="index-preview.html"
                            >
                                Source: Article Notebook
                            </a>
                        </div>
                        <section id="executive-summary" className="level2" data-number={1}>
                            <h2
                                data-number={1}
                                className="anchored"
                                data-anchor-id="executive-summary"
                            >
                                <span className="header-section-number">1</span> Executive Summary
                            </h2>
                            <p>
                                There are two primarily research questions at hand. First, can the
                                privacy scores output by PrivacyLens be trusted? Second, if there is
                                reason to not dismiss the scores genrated by PrivacyLens, what can be
                                learned about the privacy of domains used to power Google Gemini’s AI
                                summaries relative to domains served in organic search results?
                            </p>
                            <p>
                                This following analysis finds that there is some consistency (
                                <span className="math inline">\(\rho = 0.33\)</span>) between raw
                                scores output by PrivacyLens via ChatGPT and those generated by Gemini
                                when instructed to score the some domains using the same rubric. While
                                these{" "}
                                <strong>
                                    results suggest some grounds for reliability of the scores output by
                                    PrivacyLens
                                </strong>
                                , a proper validation study should be conducted with gold standard
                                scores generated by experts.
                            </p>
                            <p>
                                Next, it appears as if{" "}
                                <strong>
                                    Google Gemini selectively uses domains with poorer privacy practices
                                    on the whole when generating its AI summaries relative to the
                                    domains that appear in its search results
                                </strong>
                                . Because these domains garner more clicks, according to Google’s own
                                claims, there appears to be ample opportunity for Google to improve
                                the privacy risks to which it exposes its users by accounting for
                                privacy risk scores in its Gemini summaries and Google search reuslts.
                                Generally speaking,{" "}
                                <strong>
                                    the further one navigates from Gemini / page one results, the better
                                    the privacy protections are
                                </strong>
                                . These results should be validated through a more comprehensive,
                                independent study that addresses some of the methodological challenges
                                outlined below.
                            </p>
                        </section>
                        <section
                            id="motivation-and-background"
                            className="level2"
                            data-number={2}
                        >
                            <h2
                                data-number={2}
                                className="anchored"
                                data-anchor-id="motivation-and-background"
                            >
                                <span className="header-section-number">2</span> Motivation and
                                Background
                            </h2>
                            <p>
                                Google’s May 2024 blog post, “Generative AI in Search: Let Google do
                                the searching for you” features a promotional video explaining the
                                ways in which Gemini summaries will enhance work. The accompanying
                                promotional video claims it will “simplify” search. The company
                                reports that their experiments demonstrate that “with AI Overviews,
                                people use Search more, and are more satisfied with their results.”
                                The company also states that, “With AI Overviews, people are visiting
                                a greater diversity of websites for help with more complex questions.
                                And we see that the links included in AI Overviews get more clicks
                                than if the page had appeared as a traditional web listing for that
                                query.”{" "}
                                <span className="citation" data-cites="GoogleGenAI">
            (
            <a href="#ref-GoogleGenAI" role="doc-biblioref">
              Google 2024
            </a>
            )
          </span>{" "}
                                An estimated 1.5% of domains appear to land in Google’s AI overviews,
                                suggesting a high degree of selectivity{" "}
                                <span className="citation" data-cites="Baek2025">
            (
            <a href="#ref-Baek2025" role="doc-biblioref">
              Bæk 2025
            </a>
            )
          </span>
                                . In other words, relatively few domains appear in Google AI
                                summaries, and linking to sources in Gemini’s overviews is associated
                                with greater traffic to those links, suggesting that perhaps people
                                are indeed visiting links embedded in Gemini’s summaries.
                            </p>
                            <p>
                                Against this backdrop, it is natural to ask{" "}
                                <strong>
                                    how the privacy of websites used to power Gemini’s textual summaries
                                    compares to the privacy of websites appearing in Google’s search
                                    results
                                </strong>
                                . The analysis here addresses this question in two parts. First, it
                                assesses the reliability of privacy scores generated by{" "}
                                <a href="https://www.privacylens.info/">PrivacyLens</a>. Next, it
                                evaluates how the privacy scores of websites in Google’s Gemini
                                summaries compares to the privacy scores of other Google search
                                results.
                            </p>
                        </section>
                        <section id="methodology" className="level2" data-number={3}>
                            <h2 data-number={3} className="anchored" data-anchor-id="methodology">
                                <span className="header-section-number">3</span> Methodology
                            </h2>
                            <p>
                                Before comparing the privacy scores of websites included in Gemini’s
                                summaries and those in Google’s (sponsored and organic) search
                                results, it is first necessary to assess the quality of the privacy
                                score being used. Are these scores reliable, and what evidence
                                justifies their use?
                            </p>
                            <section id="consistency-check" className="level3" data-number="3.1">
                                <h3
                                    data-number="3.1"
                                    className="anchored"
                                    data-anchor-id="consistency-check"
                                >
                                    <span className="header-section-number">3.1</span> Consistency Check
                                </h3>
                                <p>
                                    Ideally, a robust validation study would have been conducted in
                                    which expert academics and grad students would manually score a
                                    handful of privacy policies subject to the same rubric given to
                                    PrivacyLens. These scores would be considered our sources of truth,
                                    and we could then compare PrivacyLens’s output scores against these
                                    gold standards.
                                </p>
                                <p>
                                    Without the budget to conduct a proper study to hire experts, we
                                    decided to compare the outputs from PrivacyLens (the scores of which
                                    are output by ChatGPT) to those of another LLM, Google Gemini and
                                    measure the extent to which the scores demonstrated consistency with
                                    one another. Though this approach does not tell us whether the
                                    scores themselves are accurate, it could be a sign for the extent to
                                    which the scores are precise. Still, it is of course still possible
                                    that both Chat GPT and Gemini suffer from the same imprecisions.
                                    Despite these methodological challenges, a collection of 100 domains
                                    in recent Google search results were selected. Their privacy scores
                                    (raw scores from 0 to 68) were look up in PrivacyLens’s database and
                                    collected on Google Gemini using a variety of different Gemini
                                    models: 2.0 Flash, 2.0 Flash Thinking, 2.5 Pro, and Deep Research.
                                </p>
                            </section>
                            <section
                                id="gemini-summary-evaluation"
                                className="level3"
                                data-number="3.2"
                            >
                                <h3
                                    data-number="3.2"
                                    className="anchored"
                                    data-anchor-id="gemini-summary-evaluation"
                                >
                                    <span className="header-section-number">3.2</span> Gemini Summary
                                    Evaluation
                                </h3>
                                <p>
                                    To investigate patterns in the privacy scores from Google search
                                    results, domains across a variety of health-related queries were
                                    collected. In each case, the domains from the first five pages of
                                    results were stored, and each domain was associated with a source
                                    designating where in Google search the domain originated:{" "}
                                    <code>Gemini Summary</code>, <code>Page 1 Organic</code>,{" "}
                                    <code>Page 2 Organic</code>, <code>Page 3 Organic</code>,{" "}
                                    <code>Page 4 Organic</code>, <code>Page 5 Organic</code>, and{" "}
                                    <code>Sponsored Result</code>. The same domain could be associated
                                    with multiple sources. For example, if the same domain were included
                                    in a Gemini Summary and shown on Page 2 of the organic search
                                    results, the domain would be noted twice in the collected data.
                                </p>
                                <p>
                                    The health-related queries used for this data collection exercise
                                    were:
                                </p>
                                <ul>
                                    <li>What does a rash on my arm mean?</li>
                                    <li>How to cope with anxiety?</li>
                                    <li>How to increase chances of getting pregnant?</li>
                                    <li>Tips to live with fibromyalgia</li>
                                    <li>What is intermittent fasting and how does it work?</li>
                                    <li>What are the benefits of acupuncture?</li>
                                    <li>What are the steps of a colonoscopy?</li>
                                    <li>How to appeal a denied insurance claim?</li>
                                    <li>How to rescue someone who is choking?</li>
                                    <li>
                                        What are the best at-home blood pressure monitors to purchase?
                                    </li>
                                </ul>
                                <p>
                                    Due to one methodological oversight in which domains belonging to
                                    Google and its sub-domains were not scraped as part of our data,
                                    YouTube domains were not collected. Also, if a domain appeared in
                                    the organic search results repeatedly, then the associated data
                                    captured that same domain <code>n</code> times. The rationale behind
                                    this decision was the idea that if a user were clicking at random or
                                    without must inspection, the chance that they visit a website that
                                    appears in the search results repeatedly increases proportionally
                                    with the number of search results from the domain. However, one
                                    exception to this rule was made as part of the data collection. For
                                    domains in which multiple sites were linked closely together, as in
                                    the image below, the domain was noted only once in the data.
                                </p>
                                <div className="quarto-figure quarto-figure-center">
                                    <figure className="figure">
                                        <p>
                                            <a
                                                href="repeated_domains.png"
                                                className="lightbox"
                                                data-gallery="quarto-lightbox-gallery-1"
                                                title="Grouped domains in Google search results were not stored repeatedly, but domains that appeared multiple (e.g., two) times – even on that same page – were stored as multiple (e.g., two) entries in the data collection process provided that they were not presented in a grouped fashion."
                                            >
                                                <img
                                                    src="repeated_domains.png"
                                                    className="img-fluid figure-img"
                                                    alt="Grouped domains in Google search results were not stored repeatedly, but domains that appeared multiple (e.g., two) times – even on that same page – were stored as multiple (e.g., two) entries in the data collection process provided that they were not presented in a grouped fashion."
                                                />
                                            </a>
                                        </p>
                                        <figcaption>
                                            Grouped domains in Google search results were not stored
                                            repeatedly, but domains that appeared multiple (e.g., two) times
                                            – even on that same page – were stored as multiple (e.g., two)
                                            entries in the data collection process provided that they were
                                            not presented in a grouped fashion.
                                        </figcaption>
                                    </figure>
                                </div>
                            </section>
                        </section>
                        <section id="results" className="level2" data-number={4}>
                            <h2 data-number={4} className="anchored" data-anchor-id="results">
                                <span className="header-section-number">4</span> Results
                            </h2>
                            <section
                                id="llm-consistency-results-chat-gpt-vs.-gemini"
                                className="level3"
                                data-number="4.1"
                            >
                                <h3
                                    data-number="4.1"
                                    className="anchored"
                                    data-anchor-id="llm-consistency-results-chat-gpt-vs.-gemini"
                                >
                                    <span className="header-section-number">4.1</span> LLM Consistency
                                    Results: Chat GPT vs.&nbsp;Gemini
                                </h3>
                                <p>
                                    The sample of domains used in this analysis deviates strongly from
                                    random. While the distribution of domain scores in the PrivacyLens
                                    database is even (i.e,.{" "}
                                    <span className="math inline">
              \(\frac{"{"}1{"}"}
                                        {"{"}3{"}"}\)
            </span>{" "}
                                    assigned to each category weak, moderate, and strong), the domains
                                    in this analysis skew much more heavily toward moderate and strong,
                                    as{" "}
                                    <a href="#fig-dist" className="quarto-xref">
                                        Figure&nbsp;1
                                    </a>{" "}
                                    shows. Based on the data shown in the plot of scores by model alone
                                    (right), it appears as if Chat GPT scores websites more leniently.
                                    Interestingly, Gemini did not classify any sites as{" "}
                                    <code>weak</code>.
                                </p>
                                <div id="cell-fig-dist" className="cell">
                                    <div className="cell-output-display">
                                        <div
                                            id="fig-dist"
                                            className="quarto-float quarto-figure quarto-figure-center anchored"
                                        >
                                            <figure className="quarto-float quarto-float-fig figure">
                                                <div aria-describedby="fig-dist-caption-0ceaefa1-69ba-4598-a22c-09a6ac19f8ca">
                                                    <a
                                                        href="index_files/figure-html/fig-dist-1.png"
                                                        className="lightbox"
                                                        data-gallery="quarto-lightbox-gallery-2"
                                                        title="Figure 1: Privacy score distributions overall (left) and by model (right)"
                                                    >
                                                        <img
                                                            src="index_files/figure-html/fig-dist-1.png"
                                                            className="img-fluid figure-img"
                                                            width={672}
                                                        />
                                                    </a>
                                                </div>
                                                <figcaption
                                                    className="quarto-float-caption-bottom quarto-float-caption quarto-float-fig"
                                                    id="fig-dist-caption-0ceaefa1-69ba-4598-a22c-09a6ac19f8ca"
                                                >
                                                    Figure&nbsp;1: Privacy score distributions overall (left)
                                                    and by model (right)
                                                </figcaption>
                                            </figure>
                                        </div>
                                    </div>
                                </div>
                                <p>
                                    Among scores output by Google Gemini itself, the distribution of
                                    score buckets is not even across all model versions, as{" "}
                                    <a href="#fig-gemini-version" className="quarto-xref">
                                        Figure&nbsp;2
                                    </a>{" "}
                                    shows. For instance, Gemini 2.5 Pro appears most lenient, about 80%
                                    of domains scored by this version were classified as{" "}
                                    <code>strong</code>. However, it is possible that the privacy scores
                                    of the underlying websites did legitimately differ. To study this
                                    phenonenon more closely in the future, the same domain should be
                                    scored by different Gemini versions, much in the same way Chat GPT
                                    and Gemini are being compared against one another here.
                                </p>
                                <div id="cell-fig-gemini-version" className="cell">
                                    <div className="cell-output-display">
                                        <div
                                            id="fig-gemini-version"
                                            className="quarto-float quarto-figure quarto-figure-center anchored"
                                        >
                                            <figure className="quarto-float quarto-float-fig figure">
                                                <div aria-describedby="fig-gemini-version-caption-0ceaefa1-69ba-4598-a22c-09a6ac19f8ca">
                                                    <a
                                                        href="index_files/figure-html/fig-gemini-version-1.png"
                                                        className="lightbox"
                                                        data-gallery="quarto-lightbox-gallery-3"
                                                        title="Figure 2: The plot above shows how each Google Gemini model vesion used here evaluted different domains. Surprisngly, the distribution is not even. Based on these results alone, Gemini 2.5 Pro appears to be the most lenient, while 2.0 Flash Thinking appears the strictest. Still, further study is needed, as the observed results may be attributable to the domains at hand since the same domains were not scored by multiple Gemini model versions."
                                                    >
                                                        <img
                                                            src="index_files/figure-html/fig-gemini-version-1.png"
                                                            className="img-fluid figure-img"
                                                            width={672}
                                                        />
                                                    </a>
                                                </div>
                                                <figcaption
                                                    className="quarto-float-caption-bottom quarto-float-caption quarto-float-fig"
                                                    id="fig-gemini-version-caption-0ceaefa1-69ba-4598-a22c-09a6ac19f8ca"
                                                >
                                                    Figure&nbsp;2: The plot above shows how each Google Gemini
                                                    model vesion used here evaluted different domains.
                                                    Surprisngly, the distribution is not even. Based on these
                                                    results alone, Gemini 2.5 Pro appears to be the most
                                                    lenient, while 2.0 Flash Thinking appears the strictest.
                                                    Still, further study is needed, as the observed results may
                                                    be attributable to the domains at hand since the same
                                                    domains were not scored by multiple Gemini model versions.
                                                </figcaption>
                                            </figure>
                                        </div>
                                    </div>
                                </div>
                                <p>
                                    <a href="#fig-corr" className="quarto-xref">
                                        Figure&nbsp;3
                                    </a>{" "}
                                    illustrates that the correlation of privacy scores output by Chat
                                    GPT and those output by Gemini is 0.33. If the scores had aligned
                                    completely (i.e, <span className="math inline">\(\rho\)</span> of
                                    1), then all the points would have fallen along the gray dotted
                                    line. The linear regression line is shown in blue. The points in
                                    green correspond to domains in which both models output the same
                                    score category, while those in orange diverge. A closer analysis of
                                    which sites are over-(under-)evaluated by which model is a natural
                                    follow-up to this observation.
                                </p>
                                <div id="cell-fig-corr" className="cell">
                                    <div className="cell-output-display">
                                        <div
                                            id="fig-corr"
                                            className="quarto-float quarto-figure quarto-figure-center anchored"
                                        >
                                            <figure className="quarto-float quarto-float-fig figure">
                                                <div aria-describedby="fig-corr-caption-0ceaefa1-69ba-4598-a22c-09a6ac19f8ca">
                                                    <a
                                                        href="index_files/figure-html/fig-corr-1.png"
                                                        className="lightbox"
                                                        data-gallery="quarto-lightbox-gallery-4"
                                                        title="Figure 3: The scores output by both LLMs clearly have non-zero correlation, suggesting a degree of consistency."
                                                    >
                                                        <img
                                                            src="index_files/figure-html/fig-corr-1.png"
                                                            className="img-fluid figure-img"
                                                            width={672}
                                                        />
                                                    </a>
                                                </div>
                                                <figcaption
                                                    className="quarto-float-caption-bottom quarto-float-caption quarto-float-fig"
                                                    id="fig-corr-caption-0ceaefa1-69ba-4598-a22c-09a6ac19f8ca"
                                                >
                                                    Figure&nbsp;3: The scores output by both LLMs clearly have
                                                    non-zero correlation, suggesting a degree of consistency.
                                                </figcaption>
                                            </figure>
                                        </div>
                                    </div>
                                </div>
                            </section>
                            <section
                                id="gemini-summary-findings"
                                className="level3"
                                data-number="4.2"
                            >
                                <h3
                                    data-number="4.2"
                                    className="anchored"
                                    data-anchor-id="gemini-summary-findings"
                                >
                                    <span className="header-section-number">4.2</span> Gemini Summary
                                    Findings
                                </h3>
                                <p>
                                    The findings above considered score categories (<code>weak</code>,{" "}
                                    <code>moderate</code>, and <code>strong</code>), while the plots
                                    below show risk levels (<code>low</code>, <code>medium</code>, and{" "}
                                    <code>high</code>). These two metrics are directionally opposed. In
                                    other words, <code>high</code> risk is associated with{" "}
                                    <code>weak</code> privacy scores.
                                </p>
                                <p>
                                    Of the ten search queries used to collect data here, Gemini
                                    summaries were generated for all but the final two (“
                                    <em>How to rescue someone who is choking?</em>” and “
                                    <em>
                                        What are the best at-home blood pressure monitors to purchase?
                                    </em>
                                    ”).
                                </p>
                                <p>
                                    The distribution of domains per source in Google Search is shown in{" "}
                                    <a href="#fig-domain-vol-pg" className="quarto-xref">
                                        Figure&nbsp;4
                                    </a>
                                    . Despite the fact that only 8 of the 10 search queries resulted in
                                    results with Gemini summaries, the number of domains power Gemini
                                    summaries exceeds that of any other organic search result page. A
                                    few domains from sponsored results are noted here and disregarded in
                                    the rest of the analysis since the volume is quite small and since
                                    sponsored results appeared on multiple search result pages within
                                    the same query (e.g., sponsored results on both page one and page
                                    two).
                                </p>
                                <div id="cell-fig-domain-vol-pg" className="cell">
                                    <div className="cell-output-display">
                                        <div
                                            id="fig-domain-vol-pg"
                                            className="quarto-float quarto-figure quarto-figure-center anchored"
                                        >
                                            <figure className="quarto-float quarto-float-fig figure">
                                                <div aria-describedby="fig-domain-vol-pg-caption-0ceaefa1-69ba-4598-a22c-09a6ac19f8ca">
                                                    <a
                                                        href="index_files/figure-html/fig-domain-vol-pg-1.png"
                                                        className="lightbox"
                                                        data-gallery="quarto-lightbox-gallery-5"
                                                        title="Figure 4: Domain volume by source across all 10 health queries"
                                                    >
                                                        <img
                                                            src="index_files/figure-html/fig-domain-vol-pg-1.png"
                                                            className="img-fluid figure-img"
                                                            width={672}
                                                        />
                                                    </a>
                                                </div>
                                                <figcaption
                                                    className="quarto-float-caption-bottom quarto-float-caption quarto-float-fig"
                                                    id="fig-domain-vol-pg-caption-0ceaefa1-69ba-4598-a22c-09a6ac19f8ca"
                                                >
                                                    Figure&nbsp;4: Domain volume by source across all 10 health
                                                    queries
                                                </figcaption>
                                            </figure>
                                        </div>
                                    </div>
                                </div>
                                <p>
                                    When collecting the data, it was observed that many of the same
                                    domains in the Gemini summary appear on page one of the organic
                                    search results, suggesting that perhaps Google uses popular sites to
                                    power Gemini. For several queries, Gemini used at least half of the
                                    domains in the page one organic search results for its AI summaries,
                                    as shown in{" "}
                                    <a href="#fig-gemini-frequent" className="quarto-xref">
                                        Figure&nbsp;5
                                    </a>
                                    .
                                </p>
                                <div id="cell-fig-gemini-frequent" className="cell">
                                    <div className="cell-output-display">
                                        <div
                                            id="fig-gemini-frequent"
                                            className="quarto-float quarto-figure quarto-figure-center anchored"
                                        >
                                            <figure className="quarto-float quarto-float-fig figure">
                                                <div aria-describedby="fig-gemini-frequent-caption-0ceaefa1-69ba-4598-a22c-09a6ac19f8ca">
                                                    <a
                                                        href="index_files/figure-html/fig-gemini-frequent-1.png"
                                                        className="lightbox"
                                                        data-gallery="quarto-lightbox-gallery-6"
                                                        title="Figure 5: Domains occuring in the first page of organic search results are frequently used in Google Gemini summaries. For instance, half of the 8 domains occuring in the organic results on page 1 for the query ‘How to appeal a denied insurance claim?’ were used to power Gemini’s summary for that query."
                                                    >
                                                        <img
                                                            src="index_files/figure-html/fig-gemini-frequent-1.png"
                                                            className="img-fluid figure-img"
                                                            width={672}
                                                        />
                                                    </a>
                                                </div>
                                                <figcaption
                                                    className="quarto-float-caption-bottom quarto-float-caption quarto-float-fig"
                                                    id="fig-gemini-frequent-caption-0ceaefa1-69ba-4598-a22c-09a6ac19f8ca"
                                                >
                                                    Figure&nbsp;5: Domains occuring in the first page of organic
                                                    search results are frequently used in Google Gemini
                                                    summaries. For instance, half of the 8 domains occuring in
                                                    the organic results on page 1 for the query ‘How to appeal a
                                                    denied insurance claim?’ were used to power Gemini’s summary
                                                    for that query.
                                                </figcaption>
                                            </figure>
                                        </div>
                                    </div>
                                </div>
                                <p>
                                    To better understand the overlap between domains used to power
                                    Gemini and those appearing on page one organic search results, we
                                    can classify each (non-sponsored) domain on the first page of Google
                                    search results as one that powers Gemini, one served in the organic
                                    search reuslts, or one that appears in both groups. The Venn diagram
                                    below illustrates classification.
                                </p>
                                <div className="quarto-figure quarto-figure-center">
                                    <figure className="figure">
                                        <p>
                                            <a
                                                href="venn_diagram.png"
                                                className="lightbox"
                                                data-gallery="quarto-lightbox-gallery-7"
                                                title="Domains on the first page can be classified into those appearing in Gemini only, those in Page 1 Organic only, or those domains in both, as the diagram above illustrates."
                                            >
                                                <img
                                                    src="venn_diagram.png"
                                                    className="img-fluid figure-img"
                                                    alt="Domains on the first page can be classified into those appearing in Gemini only, those in Page 1 Organic only, or those domains in both, as the diagram above illustrates."
                                                />
                                            </a>
                                        </p>
                                        <figcaption>
                                            Domains on the first page can be classified into those appearing
                                            in Gemini only, those in Page 1 Organic only, or those domains
                                            in both, as the diagram above illustrates.
                                        </figcaption>
                                    </figure>
                                </div>
                                <p>
                                    The plot below,{" "}
                                    <a href="#fig-score-by-origin" className="quarto-xref">
                                        Figure&nbsp;6
                                    </a>
                                    , shows how the risk categories of the domains in each of these
                                    groups is distributed. Note that plot treats each of these three
                                    three groups as mutually exclusive. (To be clear, if a domain
                                    appears in both Gemini’s summary and in page one organic search
                                    results, the domain belongs to the “Both” category only and not to
                                    all three categories.) Doing so allows us to compare these three
                                    groups against one another free of the interference of
                                    double-counting the same domain in two separate groups.
                                </p>
                                <div id="cell-fig-score-by-origin" className="cell">
                                    <div className="cell-output-display">
                                        <div
                                            id="fig-score-by-origin"
                                            className="quarto-float quarto-figure quarto-figure-center anchored"
                                        >
                                            <figure className="quarto-float quarto-float-fig figure">
                                                <div aria-describedby="fig-score-by-origin-caption-0ceaefa1-69ba-4598-a22c-09a6ac19f8ca">
                                                    <a
                                                        href="index_files/figure-html/fig-score-by-origin-1.png"
                                                        className="lightbox"
                                                        data-gallery="quarto-lightbox-gallery-8"
                                                        title="Figure 6: As the plot shows, roughly an equal proportion of domains from gemini, page one, and both sources fall into the ‘high’ risk category. However, a noticeably higher proprtion of Page 1 Organic Only results fall into the ‘low’ risk category relative to the proportion from Gemini only. These results suggest that perhaps domains in Page 1 Organic only exhibit lower risk scores than those in the other two categories."
                                                    >
                                                        <img
                                                            src="index_files/figure-html/fig-score-by-origin-1.png"
                                                            className="img-fluid figure-img"
                                                            width={672}
                                                        />
                                                    </a>
                                                </div>
                                                <figcaption
                                                    className="quarto-float-caption-bottom quarto-float-caption quarto-float-fig"
                                                    id="fig-score-by-origin-caption-0ceaefa1-69ba-4598-a22c-09a6ac19f8ca"
                                                >
                                                    Figure&nbsp;6: As the plot shows, roughly an equal
                                                    proportion of domains from gemini, page one, and both
                                                    sources fall into the ‘high’ risk category. However, a
                                                    noticeably higher proprtion of Page 1 Organic Only results
                                                    fall into the ‘low’ risk category relative to the proportion
                                                    from Gemini only. These results suggest that perhaps domains
                                                    in Page 1 Organic only exhibit lower risk scores than those
                                                    in the other two categories.
                                                </figcaption>
                                            </figure>
                                        </div>
                                    </div>
                                </div>
                                <p>
                                    The distribution of risk categories by search section / page are
                                    shown in{" "}
                                    <a href="#fig-score-by-pg-seq" className="quarto-xref">
                                        Figure&nbsp;7
                                    </a>
                                    . While not strictly monotonic, the proportion of domains on each
                                    section / site belonging to the low risk category generally
                                    increases, as the visualization makes clear.
                                </p>
                                <div id="cell-fig-score-by-pg-seq" className="cell">
                                    <div className="cell-output-display">
                                        <div
                                            id="fig-score-by-pg-seq"
                                            className="quarto-float quarto-figure quarto-figure-center anchored"
                                        >
                                            <figure className="quarto-float quarto-float-fig figure">
                                                <div aria-describedby="fig-score-by-pg-seq-caption-0ceaefa1-69ba-4598-a22c-09a6ac19f8ca">
                                                    <a
                                                        href="index_files/figure-html/fig-score-by-pg-seq-1.png"
                                                        className="lightbox"
                                                        data-gallery="quarto-lightbox-gallery-9"
                                                        title="Figure 7: The proportion of domains belgonging to each risk category by Google search section / page."
                                                    >
                                                        <img
                                                            src="index_files/figure-html/fig-score-by-pg-seq-1.png"
                                                            className="img-fluid figure-img"
                                                            width={672}
                                                        />
                                                    </a>
                                                </div>
                                                <figcaption
                                                    className="quarto-float-caption-bottom quarto-float-caption quarto-float-fig"
                                                    id="fig-score-by-pg-seq-caption-0ceaefa1-69ba-4598-a22c-09a6ac19f8ca"
                                                >
                                                    Figure&nbsp;7: The proportion of domains belgonging to each
                                                    risk category by Google search section / page.
                                                </figcaption>
                                            </figure>
                                        </div>
                                    </div>
                                </div>
                                <p>
                                    Individual, page-by-page comparisons are easier to discern in the
                                    plot below. The high risk category generally decreases, while the
                                    low category generally increases.
                                </p>
                                <div className="quarto-figure quarto-figure-center">
                                    <figure className="figure">
                                        <p>
                                            <a
                                                href="score.gif"
                                                className="lightbox"
                                                data-gallery="quarto-lightbox-gallery-10"
                                                title="The proprotion of sites from low-risk domains generally tends to increase as we navigate further from the Gemini summary."
                                            >
                                                <img
                                                    src="score.gif"
                                                    className="img-fluid figure-img"
                                                    alt="The proprotion of sites from low-risk domains generally tends to increase as we navigate further from the Gemini summary."
                                                />
                                            </a>
                                        </p>
                                        <figcaption>
                                            The proprotion of sites from low-risk domains generally tends to
                                            increase as we navigate further from the Gemini summary.
                                        </figcaption>
                                    </figure>
                                </div>
                            </section>
                        </section>
                        <section id="discussion" className="level2" data-number={5}>
                            <h2 data-number={5} className="anchored" data-anchor-id="discussion">
                                <span className="header-section-number">5</span> Discussion
                            </h2>
                            <p>
                                The analysis above illustrates that some evidence of score consistency
                                exists among different large language models, providing some assurance
                                regarding the scores output by PrivacyLens. That said, while there is
                                substantial room for greater consistency to be demonstrated, even
                                perfect consistency (i.e.,{" "}
                                <span className="math inline">\(\rho = 1\)</span>) is not a foolproof
                                guarantee of accuracy. It is possible, for instance, that multiple
                                LLMs generating these risk scores are similarly biased, leading to an
                                outcome in which they demonstrate strong consistency with one another
                                – in other words, they appear precise – but lack accuracy. A full
                                validation study enlisting experts to score policies is best, and
                                these gold standard evaluations can be used as a souce of truth
                                against which the LLM risk scores can be measured.
                            </p>
                            <p>
                                Additionally, Gemini appears to generate summaries from domains with
                                relatively higher privacy risks, as the proportion of Gemini domains
                                classified as high privacy risk (45.3%) exceeds that of pages 1
                                through 5. Likewise, the proprotion of domains classified as low risk
                                in Gemini’s summaries is lower than the same proportion in pages 1
                                through 5. Given the fact that the number of domains used to power
                                Gemini is larger than the number of domains on any other page and that
                                domains powering Gemini receive more clicks, as Google has published,
                                there seems to be evidence that Google could improve the privacy risks
                                to which it exposes its users by taking risk information into account
                                when selecting domains for Gemini’s summaries and by accounting for
                                privacy risks when ranking domains in its organic search results. This
                                result is perhaps not surprising. The page rank algorithm accounts for
                                links between websites, and websites that perform well on Google
                                appear to exhibit poorer privacy practices than those that perform
                                worse.
                            </p>
                            <p>
                                Future improvements to this work include addressing some of the
                                methodological challenges and overights, include sampling a more
                                representative group of domains, inspecting patterns in which domains
                                are scored favorably by which LLMs, and conducting a proper validation
                                study. A closer inspection at patterns among top-level domains, as
                                shown in{" "}
                                <a href="#fig-tld-risks" className="quarto-xref">
                                    Figure&nbsp;8
                                </a>{" "}
                                below, is an avenue for future research.
                            </p>
                            <div id="cell-fig-tld-risks" className="cell">
                                <div className="cell-output-display">
                                    <div
                                        id="fig-tld-risks"
                                        className="quarto-float quarto-figure quarto-figure-center anchored"
                                    >
                                        <figure className="quarto-float quarto-float-fig figure">
                                            <div aria-describedby="fig-tld-risks-caption-0ceaefa1-69ba-4598-a22c-09a6ac19f8ca">
                                                <a
                                                    href="index_files/figure-html/fig-tld-risks-1.png"
                                                    className="lightbox"
                                                    data-gallery="quarto-lightbox-gallery-11"
                                                    title="Figure 8: The distribution of risk score by top-level domain. Interestingly, .gov websites seem to outperform .uk sites."
                                                >
                                                    <img
                                                        src="index_files/figure-html/fig-tld-risks-1.png"
                                                        className="img-fluid figure-img"
                                                        width={672}
                                                    />
                                                </a>
                                            </div>
                                            <figcaption
                                                className="quarto-float-caption-bottom quarto-float-caption quarto-float-fig"
                                                id="fig-tld-risks-caption-0ceaefa1-69ba-4598-a22c-09a6ac19f8ca"
                                            >
                                                Figure&nbsp;8: The distribution of risk score by top-level
                                                domain. Interestingly, .gov websites seem to outperform .uk
                                                sites.
                                            </figcaption>
                                        </figure>
                                    </div>
                                </div>
                            </div>
                            <p>
                                Studying how specific government websites, the sites of top American
                                hospitals, and popular health sites fare with respect to privacy risk
                                is all fodder for future work. Understanding the extent to which these
                                results generalize to other countries, languages, and sectors (e.g.,
                                beyond healthcare) is a natural extension of this initial analysis. It
                                is conceivable, for instance, that Google can afford to prioritize
                                privacy in its search rankings in fringe locales do not account for
                                much of its revenue.
                            </p>
                        </section>
                        <section id="conclusion" className="level2" data-number={6}>
                            <h2 data-number={6} className="anchored" data-anchor-id="conclusion">
                                <span className="header-section-number">6</span> Conclusion
                            </h2>
                            <p>
                                The raw privacy scores output by PrivacyLens via ChatGPT share a 33%
                                correlation with the scores output by Google Gemini for the same
                                domains using the same set of scoring instructions. Evidence of LLM
                                consistency may be a sign of precision, but because LLMs might be
                                similarly biased, the observed consistency is not foolproof evidence
                                of accuracy. While the evidence here disproves the idea that the
                                scores output by PrivacyLens are random, a proper validation study
                                with expert-generated gold standards is the best way to assess
                                accuracy.
                            </p>
                            <p>
                                Furthermore, based on the data collected, there appears to grounds
                                upon which to claim that Google Gemini selectively uses privacy-poor
                                sites in generating its summaries. For the Google queries used here, a
                                substantial proportion of page one organic search result domains are
                                used in Gemini summaries. As one navigates further away from the
                                Gemini summary, the domains served to the generally appear to have
                                better privacy scores, though this trend is not strictly monotonic.
                                Perhaps the observed results are connected to the underlying logic of
                                the PageRank algorithm itself, which prioritizes websites with large
                                number of links to other sites. The extent to which this behavior is
                                connected to underlying privacy practices is an opportunity for future
                                work.
                            </p>
                        </section>
                        <section
                            id="references"
                            className="level2 unnumbered"
                            data-number={7}
                        ></section>
                        <div id="quarto-appendix" className="default">
                            <section
                                className="quarto-appendix-contents"
                                role="doc-bibliography"
                                id="quarto-bibliography"
                            >
                                <h2 className="anchored quarto-appendix-heading">7 References</h2>
                                <div
                                    id="refs"
                                    className="references csl-bib-body hanging-indent"
                                    data-entry-spacing={0}
                                    role="list"
                                >
                                    <div id="ref-Baek2025" className="csl-entry" role="listitem">
                                        Bæk, Daniel Højris. 2025.{" "}
                                        <span>
                “AI Overviews Deliver MORE Traffic Than Featured Snippets,
                According to Study.”
              </span>{" "}
                                        <a href="https://seo.ai/blog/ai-overviews-deliver-more-traffic-than-featured-snippets-according-to-study">
                                            https://seo.ai/blog/ai-overviews-deliver-more-traffic-than-featured-snippets-according-to-study
                                        </a>
                                        .
                                    </div>
                                    <div id="ref-GoogleGenAI" className="csl-entry" role="listitem">
                                        Google. 2024.{" "}
                                        <span>
                “Generative AI in Search: Let Google Do the Searching for You.”
              </span>{" "}
                                        <a href="https://blog.google/products/search/generative-ai-google-search-may-2024/">
                                            https://blog.google/products/search/generative-ai-google-search-may-2024/
                                        </a>
                                        .
                                    </div>
                                </div>
                            </section>
                        </div>
                    </main>
                    {/* /main column */}
                </div>{" "}
                {/* /content */}
            </>

        </Box>
    );
};

export default CustomPage;