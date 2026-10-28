---
title: Portfolio
url: /projects/
description: Projects Hasitha Aravinda has led and built, from BPEL engines to Ballerina, WSO2 Integrator, durable workflows and AFM.
---

<!-- scenes -->

<div data-scene="intro" markdown="1">

# Portfolio

<p class="lede">Architect, Integration at <a href="https://wso2.com">WSO2</a> · Compiler developer, <a href="https://github.com/ballerina-platform/">Ballerina</a> · 2013 – now</p>

<div class="tags"><span>Ballerina</span> <span>Compiler Design</span> <span>Durable Workflows</span> <span>AI Agents</span> <span>Developer Experience</span> <span>Low-Code Editors</span> <span>WSO2 Integrator</span> <span>Integration</span> <span>Java</span> <span>BPMN</span> <span>WS-BPEL</span></div>

</div>

<div class="work current" data-scene="workflow" markdown="1">

### Durable Workflow { #durable-workflow }

<span id="ballerina-workflow"></span>
<span class="when">2026 – now · Design lead</span>

[Demos](/workflows/) · [Docs](https://wso2.com/integration-platform/docs/integrator/develop-and-test/integration-artifacts/workflow) · [Workflows that wait for people (Medium)](https://hasithaaravinda.medium.com/workflows-that-wait-for-people-8ac3b5fc3635) · [Video: human tasks](https://youtu.be/_b84Ndbk1H8) · [Video: an agent that follows the policy](https://youtu.be/XFb49Koodf8) · [module-ballerina-workflow](https://github.com/ballerina-platform/module-ballerina-workflow)

Long-running business processes in WSO2 Integrator, on durable execution with Temporal.

- **`ballerina/workflow`**: workflows are Ballerina functions. State is persisted, so a workflow can wait for events and people, retry steps and resume after a restart.
- **Human tasks**: role-based assignment, a task inbox, and decisions recorded in the workflow history.
- **Durable agents and durable agentic workflows**: AI agents run as workflow steps, keep their conversation state, ask people for input, and gate actions on approval.
- **Low-code**: workflow, task and agent nodes, their forms, and a workflow overview in the WSO2 Integrator designer, all editing the same source.
- **Operations**: the Workflow Management API to inspect, retry and recover instances; traces, metrics and a task-decision audit trail in the Integration Control Plane.

I designed the module API and its runtime model, implemented the core, and review the designer and Control Plane designs.

<div class="tags"><span>Durable Execution</span> <span>Human Tasks</span> <span>Durable Agents</span> <span>Low-Code</span> <span>Ballerina</span> <span>WSO2 Integrator</span></div>
</div>

<div class="work current" data-scene="afm" markdown="1">

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

<div class="work" data-scene="integrator" markdown="1">

### WSO2 Integrator (formerly Ballerina Integrator) { #wso2-integrator }

<span id="ballerina-integrator"></span>
<span class="when">2024 Q3 – 2025 Q3 · Design and architecture lead</span>

[WSO2 Integrator](https://wso2.com/integrator/) · [Talk at WSO2Con Barcelona 2025](/blog/2025/wso2con-ballerina-integrator/)

A developer tool for building integrations, including APIs, file processing, event-driven flows and automation. It gives one experience for low-code and pro-code work, with visual views of the architecture, message flow, control flow, data mapping and entity relationships. It builds on open standards such as OpenAPI, GraphQL, gRPC and WebSocket, and on the open-source Ballerina language.

I led the design and architecture of Ballerina Integrator, the successor to an earlier low-code tool for Ballerina. It grew out of my proof of concept [Ballerina-Diagram-Gen](https://github.com/hasithaa/Ballerina-Diagram-Gen), which introduced flow-based diagrams for Ballerina. I designed and built the core of the new platform. It was renamed WSO2 Integrator : BI in 2025 and WSO2 Integrator in 2026.

<div class="tags"><span>Ballerina</span> <span>Low-Code</span> <span>Integration</span> <span>WSO2 Integrator</span></div>
</div>

<div class="work current" data-scene="compiler" markdown="1">

### Ballerina Language & Compiler { #ballerina-compiler }

<span class="when">2016 – now</span>

[ballerina-lang](https://github.com/ballerina-platform/ballerina-lang) · [ballerina.io](https://ballerina.io) · [Language specification](https://ballerina.io/spec/lang/master) · [Talk: Programming Languages and Compilers](/blog/2025/wso2-tech-conf-compilers/) · [Ballerina identifiers](/blog/2023/ballerina-identifiers/) · [The setup-ballerina GitHub Action](/blog/2023/setup-ballerina/)

Compiler and runtime work since the early, DSL-like versions of Ballerina, and the language specification through its iterations, re-implementations and design verifications. I still work on the language and its tooling.

<div class="tags"><span>Ballerina</span> <span>Compiler Design</span> <span>Language Specification</span> <span>Java</span></div>
</div>

<div data-scene="intro" markdown="1">

## Publications & Talks

- Agent-Flavored Markdown: Natural Language Specifications for Framework-Agnostic Agent Development. AgentCraft workshop, ACM IUI 2026. [PDF](https://ceur-ws.org/Vol-4266/paper03.pdf)
- From Visual Flows to Power Programming: The Ballerina Integrator Journey. WSO2Con Barcelona 2025. [Video](/blog/2025/wso2con-ballerina-integrator/)
- Programming Languages and Compilers. WSO2 Technology Conference 2025. [Video](/blog/2025/wso2-tech-conf-compilers/)
- Introduction to Ballerina. CodeSeekers meetup, 2022. [Video](/blog/2022/meetup/)

</div>

<details data-scene="bpm" markdown="1">
<summary>Earlier work, 2011 – 2016</summary>

<div class="work" markdown="1">

### WSO2 Business Process Server { #wso2-bps }

<span class="when">2012 – 2016 · Developer and release manager</span>

[Carbon Business Process](https://github.com/wso2/carbon-business-process) · [Product BPS (archived)](https://github.com/wso2-attic/product-bps) · [Apache ODE fork](https://github.com/wso2/wso2-ode)

An open-source business process server that ran processes written in BPMN, WS-BPEL and WS-HumanTask, using a WSO2-maintained fork of Apache ODE as its BPEL engine. I added features including HumanTask coordination, a caching layer and several UX improvements. The product is retired.

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
