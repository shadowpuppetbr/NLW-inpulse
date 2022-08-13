import { SubmitFeedbackUseCase } from "./submit-feedback-use-case";

const createFeedbackSpy = jest.fn();
const sendMailSpy = jest.fn();
const submitFeedback = new SubmitFeedbackUseCase(
  { create:  createFeedbackSpy },
  { sendMail: sendMailSpy }
);

describe("Seubmit feedback", () => {
  it("should be able to submit a feebback", async () => {
    await expect(
      submitFeedback.execute({
        type: "BUG",
        comment: "example comment",
        screenshot: "data:image/png;base64",
      })
    ).resolves.not.toThrow();
    
    expect(createFeedbackSpy).toHaveBeenCalled();
    expect(sendMailSpy).toHaveBeenCalled();
});

  it("should not be able to submit a feebback wihtout a type", async () => {
    await expect(
      submitFeedback.execute({
        type: "",
        comment: "example comment",
        screenshot: "data:image/png;base64dasiouhduoahd",
      })
    ).rejects.toThrow();
  });

  it("should not be able to submit a feebback wihtout a comment", async () => {
    await expect(
      submitFeedback.execute({
        type: "BUG",
        comment: "",
        screenshot: "data:image/png;base64dasiouhduoahd",
      })
    ).rejects.toThrow();
  });
  it("should not be able to submit a feebback wiht an invalid screenshot", async () => {
    await expect(
      submitFeedback.execute({
        type: "BUG",
        comment: "example comment",
        screenshot: "test.png",
      })
    ).rejects.toThrow();
  });
});
