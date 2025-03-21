import { Injectable } from '@nestjs/common';
import {
  InterviewQuestionAnswerDto,
  InterviewQuestionDto,
} from './dto/interview-question.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class InterviewQuestionService {
  constructor(private readonly prisma: PrismaService) {}

  async update(saveInterviewQuestionsDto: InterviewQuestionDto[]) {
    const updatedQuestions = Promise.all(
      saveInterviewQuestionsDto.map((dto) => {
        const { details, ...questionData } = dto;

        return this.prisma.interviewQuestion.upsert({
          where: { id: dto.id },
          update: {
            ...questionData,
            details: details
              ? {
                  upsert: {
                    update: {
                      options: details.options
                        ? JSON.stringify(details.options)
                        : null,
                      min: details.min || null,
                      max: details.max || null,
                      step: details.step || null,
                    },
                    create: {
                      options: details.options
                        ? JSON.stringify(details.options)
                        : null,
                      min: details.min || null,
                      max: details.max || null,
                      step: details.step || null,
                    },
                  },
                }
              : undefined,
          },
          create: {
            question: questionData.question,
            category: questionData.category,
            discipline: questionData.discipline,
            isEnabled: questionData.isEnabled,
            type: questionData.type,
            details: details
              ? {
                  create: {
                    options: details.options || null,
                    min: details.min || null,
                    max: details.max || null,
                    step: details.step || null,
                  },
                }
              : undefined,
          },
        });
      }),
    );
    return updatedQuestions;
  }

  async getAll() {
    const interviewQuestions = await this.prisma.interviewQuestion.findMany({
      include: {
        details: true,
      },
    });
    const interviewQuestionDtos =
      this.getDtosFromInterviewQuestionList(interviewQuestions);
    return interviewQuestionDtos;
  }

  async getEnabled() {
    const allInterviewQuestions = await this.prisma.interviewQuestion.findMany({
      include: {
        details: true,
      },
    });
    const enabledInterviewQuestions = allInterviewQuestions.filter(
      (q) => q.isEnabled,
    );
    const interviewQuestionDtos = this.getDtosFromInterviewQuestionList(
      enabledInterviewQuestions,
    );
    return interviewQuestionDtos;
  }

  async get(questionId: string) {
    const interviewQuestion = await this.prisma.interviewQuestion.findUnique({
      where: { id: questionId },
      include: {
        details: true,
      },
    });
    if (!interviewQuestion) return null;
    const interviewQuestionDto =
      this.getDtoFromInterviewQuestion(interviewQuestion);
    return interviewQuestionDto;
  }

  async getAnswersByQuestionId(questionId: string) {
    const answers = await this.prisma.interviewQuestionAnswer.findMany({
      where: { questionId },
      include: {
        intern: true,
      },
    });
    return answers;
  }

  async updateFlag(answerId: string, flag: boolean) {
    return await this.prisma.interviewQuestionAnswer.update({
      where: { id: answerId },
      data: {
        flag,
      },
    });
  }

  async addAnswers(interviewQuestionAnswers: InterviewQuestionAnswerDto[]) {
    const newAnswers = await this.prisma.interviewQuestionAnswer.createMany({
      data: interviewQuestionAnswers.map((dto: InterviewQuestionAnswerDto) => ({
        questionId: dto.questionId,
        internId: dto.internId,
        answer: dto.answer,
        flag: dto.flag,
      })),
    });

    return newAnswers;
  }

  private getDtosFromInterviewQuestionList(
    interviewQuestions: InterviewQuestionDto[],
  ) {
    const interviewQuestionDtos: InterviewQuestionDto[] =
      interviewQuestions.map((q) => {
        return this.getDtoFromInterviewQuestion(q);
      });

    return interviewQuestionDtos;
  }

  private getDtoFromInterviewQuestion(interviewQuestion: InterviewQuestionDto) {
    return {
      id: interviewQuestion.id,
      category: interviewQuestion.category,
      type: interviewQuestion.type,
      question: interviewQuestion.question,
      isEnabled: interviewQuestion.isEnabled,
      discipline: interviewQuestion.discipline,
      details: {
        options: interviewQuestion.details?.options
          ? JSON.parse(interviewQuestion.details?.options)
          : null,
        min: interviewQuestion.details?.min,
        max: interviewQuestion.details?.max,
        step: interviewQuestion.details?.step,
      },
    };
  }
}
