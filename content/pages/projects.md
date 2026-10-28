---
title: Portfolio
url: /projects/
description: Projects Hasitha Aravinda has led and built, from BPEL engines to Ballerina, WSO2 Integrator, durable workflows and AFM.
---

# Portfolio

<p class="lede">Architect, Integration at <a href="https://wso2.com">WSO2</a> · Compiler developer, <a href="https://github.com/ballerina-platform/">Ballerina</a> · 2013 – now</p>

<div class="tags"><span>Ballerina</span> <span>Compiler Design</span> <span>Durable Workflows</span> <span>AI Agents</span> <span>Developer Experience</span> <span>Low-Code Editors</span> <span>WSO2 Integrator</span> <span>Integration</span> <span>Java</span> <span>BPMN</span> <span>WS-BPEL</span></div>

<div class="work current" markdown="1">

### Ballerina Workflow { #ballerina-workflow }

<span class="when">2026 – now · Design lead</span>

[module-ballerina-workflow](https://github.com/ballerina-platform/module-ballerina-workflow) · [Workflows that wait for people (Medium)](https://hasithaaravinda.medium.com/workflows-that-wait-for-people-8ac3b5fc3635) · [Video walkthrough](https://youtu.be/_b84Ndbk1H8)

I lead the design and implementation of workflow support for Ballerina and WSO2 Integrator. A workflow is ordinary Ballerina code that the runtime makes durable. It can wait days for an event or a person's decision, retry failed steps, and continue after a restart. On top of that core, the module adds human tasks with roles and an inbox, durable AI agents that run as workflow steps, a management API to inspect, retry and recover running instances, and monitoring in the Integration Control Plane. The visual designer in WSO2 Integrator edits the same code.

<div class="tags"><span>Ballerina</span> <span>Durable Execution</span> <span>Human Tasks</span> <span>AI Agents</span> <span>WSO2 Integrator</span></div>
</div>

<div class="work current" markdown="1">

### Agent-Flavored Markdown (AFM) { #afm }

<span class="when">2025 – now · Originator</span>

[Specification](https://wso2.github.io/agent-flavored-markdown/specification/) · [wso2/agent-flavored-markdown](https://github.com/wso2/agent-flavored-markdown) · [Original prototype (hasithaa/afm)](https://github.com/hasithaa/afm) · [Paper (PDF)](https://ceur-ws.org/Vol-4266/paper03.pdf)

AFM is an open specification for defining AI agents in Markdown. YAML front matter holds the configuration: model, tools, interfaces and limits. The Markdown body holds the agent's role and instructions in natural language. Keeping the two apart makes an agent readable by domain experts and portable across frameworks.

I started AFM in 2025 as a prototype. My colleague Maryam Ziyad Mohamed took it forward, and it is now developed at WSO2 with a reference implementation. We described it in a paper at the AgentCraft workshop at ACM IUI 2026:

> Maryam Ziyad Mohamed, Hasitha Aravinda, Rania Khalaf. *Agent-Flavored Markdown: Natural Language Specifications for Framework-Agnostic Agent Development.* AgentCraft 2026: Workshop on Agentic AI Systems Development, ACM IUI 2026, Paphos, Cyprus. CEUR-WS Vol-4266.

<p><button type="button" class="copy" data-copy="afm-bibtex">Copy BibTeX</button></p>

<pre id="afm-bibtex">@inproceedings{mohamed2026afm,
  title={Agent-Flavored Markdown: Natural Language Specifications for Framework-Agnostic Agent Development},
  author={{Ziyad Mohamed}, Maryam and Aravinda, Hasitha and Khalaf, Rania},
  booktitle={Joint Proceedings of the ACM IUI 2026 Workshops co-located with the 31st Annual ACM Conference on Intelligent User Interfaces (IUI 2026)},
  editor={Tommasel, Antonela and Kahr, Patricia and Dinakar, Karthik and others},
  series={CEUR Workshop Proceedings},
  volume={4266},
  publisher={CEUR-WS.org},
  issn={1613-0073},
  year={2026},
  url={https://ceur-ws.org/Vol-4266/paper03.pdf}
}</pre>

<div class="tags"><span>AI Agents</span> <span>Specification</span> <span>Markdown</span> <span>Interoperability</span></div>
</div>

<div class="work" markdown="1">

### WSO2 Integrator (formerly Ballerina Integrator) { #wso2-integrator }

<span id="ballerina-integrator"></span>
<span class="when">2024 Q3 – 2025 Q3 · Design and architecture lead</span>

[WSO2 Integrator](https://wso2.com/integrator/) · [Talk at WSO2Con Barcelona 2025](/blog/2025/wso2con-ballerina-integrator/)

A developer tool for building integrations, including APIs, file processing, event-driven flows and automation. It gives one experience for low-code and pro-code work, with visual views of the architecture, message flow, control flow, data mapping and entity relationships. It builds on open standards such as OpenAPI, GraphQL, gRPC and WebSocket, and on the open-source Ballerina language.

I led the design and architecture of Ballerina Integrator, the successor to an earlier low-code tool for Ballerina. It grew out of my proof of concept [Ballerina-Diagram-Gen](https://github.com/hasithaa/Ballerina-Diagram-Gen), which introduced flow-based diagrams for Ballerina. I designed and built the core of the new platform. It was renamed WSO2 Integrator : BI in 2025 and WSO2 Integrator in 2026.

<div class="tags"><span>Ballerina</span> <span>Low-Code</span> <span>Integration</span> <span>WSO2 Integrator</span></div>
</div>

<div class="work current" markdown="1">

### Ballerina Language & Compiler { #ballerina-compiler }

<span class="when">2016 – now</span>

[ballerina-lang](https://github.com/ballerina-platform/ballerina-lang) · [ballerina.io](https://ballerina.io) · [Language specification](https://ballerina.io/spec/lang/master) · [Talk: Programming Languages and Compilers](/blog/2025/wso2-tech-conf-compilers/)

I joined the compiler and runtime team in the early days, when Ballerina was still experimenting with DSL-like syntax, and helped build the compiler that integration developers use today. I have contributed to the language specification from the start of the design process, through several iterations, feature changes, re-implementations and design verifications. I still work on the language and its tooling.

<div class="tags"><span>Ballerina</span> <span>Compiler Design</span> <span>Language Specification</span> <span>Java</span></div>
</div>

## Publications & Talks

- Agent-Flavored Markdown: Natural Language Specifications for Framework-Agnostic Agent Development. AgentCraft workshop, ACM IUI 2026. [PDF](https://ceur-ws.org/Vol-4266/paper03.pdf)
- From Visual Flows to Power Programming: The Ballerina Integrator Journey. WSO2Con Barcelona 2025. [Video](/blog/2025/wso2con-ballerina-integrator/)
- Programming Languages and Compilers. WSO2 Technology Conference 2025. [Video](/blog/2025/wso2-tech-conf-compilers/)
- Introduction to Ballerina. CodeSeekers meetup, 2022. [Video](/blog/2022/meetup/)

<details markdown="1">
<summary>Earlier work, 2011 – 2016</summary>

<div class="work" markdown="1">

### WSO2 Business Process Server { #wso2-bps }

<span class="when">2012 – 2016 · Developer and release manager</span>

[Carbon Business Process](https://github.com/wso2/carbon-business-process) · [Product BPS (archived)](https://github.com/wso2-attic/product-bps) · [Apache ODE fork](https://github.com/wso2/wso2-ode)

An open-source business process server that ran processes written in BPMN, WS-BPEL and WS-HumanTask, using a WSO2-maintained fork of Apache ODE as its BPEL engine. I added features including HumanTask coordination, a caching layer and several UX improvements. The product is retired, but I am always happy to talk about it.

</div>

<div class="work" markdown="1">

### WSO2 Business Rules Server { #wso2-brs }

<span class="when">2012 – 2014 · Maintainer and release manager</span>

[Product BRS (archived)](https://github.com/wso2-attic/product-brs)

An open-source server that exposed business rules as secure web services. I maintained and released it. It is now retired.

</div>

<div class="work" markdown="1">

### Java4BPEL Extension { #java4bpel }

<span class="when">2013 – 2015 · Side project</span>

[java4bpel](https://github.com/hasithaa/java4bpel)

An Apache ODE and WSO2 BPS extension that added a BPEL extension activity for calling Java libraries from BPEL workflows.

</div>

<div class="work" markdown="1">

### MetCat { #metcat }

<span class="when">2011 – 2012 · University project</span>

[MetCat (Apache Extras archive)](https://code.google.com/archive/a/apache-extras.org/p/metcat)

A metadata catalog for Apache Airavata that captured workflow metadata and supported scalable metadata management and user-defined queries.

</div>

</details>
