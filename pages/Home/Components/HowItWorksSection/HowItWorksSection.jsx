import { FiFilePlus, FiSettings, FiBarChart2 } from "react-icons/fi";

export function HowItWorksSection() {
  const steps = [
    {
      title: "Add Your Assets",
      description:
        "Easily register all your company assets with detailed information for tracking and management.",
      color: "bg-amber-600/10 text-amber-600",
      icon: FiFilePlus,
      wrapper: true
    },
    {
      title: "Automate Workflows",
      description:
        "Set up automated processes for asset requests, approvals, and maintenance scheduling.",
      color: "bg-indigo-600/10 text-indigo-600",
      icon: FiSettings,
      wrapper: true
    },
    {
      title: "Track & Optimize",
      description:
        "Use real-time analytics to monitor asset usage, reduce costs, and improve productivity.",
      color: "bg-emerald-600/10 text-emerald-600",
      icon: FiBarChart2,
      wrapper: false
    },
  ];

  return (
    <div className="py-14">
      {/* Header */}
      <div className="mb-10 text-center">
        <h2 className="max-w-xl mx-auto text-4xl font-bold text-base-content">
          How It's Work?
        </h2>
        <p className="mt-3 max-w-xl mx-auto text-base-content/60">
          From system setup to performance optimization, our workflow is executed in three precise and straightforward steps.
        </p>
      </div>
      {/* ======================= */}
      <section className="mx-auto max-w-7xl px-4 text-center">
      <ul className="steps  steps-vertical md:steps-horizontal  w-full">
        {steps.map((step, idx) => (
          <li key={idx} className={`step ${step?.wrapper && 'step-secondary'}`} >
            <div
              
              className=" px-6 transition flex flex-col items-start md:items-center"
            >
              <div
                className={`mb-2 mt-10 md:mt-5 flex h-10 w-10 items-center justify-center rounded-xl ${step?.color}`}
              >
                <step.icon className="h-5 w-5" />
              </div>
              <div className="text-start md:text-center">
                <p className="my-1 text-base-content/70">Step: {idx + 1}</p>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-gray-500 text-sm">{step.description}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
    </div>
  );
}
