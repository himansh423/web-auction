document.addEventListener("DOMContentLoaded", () => {
  const submitButton = document.getElementById("submit-button");
  const answerSourceSelect = document.getElementById("answer-source");
  const selectedTopicSelect = document.getElementById("selected-topic");
  const userQuestionTextarea = document.getElementById("user-question");
  const aiResponseContainer = document.getElementById("ai-response-container");
  const aiResponseElement = document.getElementById("ai-response");

  submitButton.addEventListener("click", async (evt) => {
    const answerSource = answerSourceSelect.value;
    const selectedTopic = selectedTopicSelect.value;
    const userQuestion = userQuestionTextarea.value.trim();

    if (!userQuestion) {
      alert("Please enter a question");
      return;
    }

    if (answerSource === "teacher") {
      alert(
        "Your question has been submitted. The teacher will respond within 24 hours."
      );
      aiResponseContainer.classList.add("hidden");
    } else if (answerSource === "ai") {
      try {
        const aiResponse = await generateAIResponse(
          selectedTopic,
          userQuestion
        );
        aiResponseElement.textContent = aiResponse;
        aiResponseContainer.classList.remove("hidden");
      } catch (error) {
        console.error("Error generating AI response:", error);
        alert("Failed to generate AI response. Please try again.");
      }
    }
  });

  async function generateAIResponse(topic, question) {
    const topicDetails = {
      "linear-equation":
        "Linear Equations involve solving systems of equations using methods like elimination and substitution.",
      matrix_operations:
        "Matrix Operations include addition, subtraction, and multiplication of matrices.",
      determinants:
        "Determinants are mathematical calculations used in solving linear systems and understanding matrix properties.",
    };

    const topicIntro = topicDetails[topic] || "Mathematical topic";

    return `Great question about ${topicIntro}! 

Based on your question: "${question}"

Here's a detailed explanation:
1. Understand the context of your query
2. Break down the problem into manageable steps
3. Apply relevant mathematical principles
4. Provide a clear, step-by-step solution

Would you like me to elaborate on any specific aspect of this topic?`;
  }
});
